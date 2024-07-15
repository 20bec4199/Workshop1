

import {
  DashboardOutlined,
  LogoutOutlined,
  ProfileOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import imgsrc from '../images/images.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Menu } from 'antd';
import { MdEvent } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const SiderBar = ({ selected, setSelected, collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    dob: " ",
    gender: "",
    experience: "",
    department: "",
    campus: "",
    designation: "",
    imageData: [],
    role: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/workshop/user', {
          withCredentials: true
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const getMenuItems = () => {
    switch (user.role) {
      case "admin":
        return [
          {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
          },
          {
            key: 'profile',
            icon: <ProfileOutlined />,
            label: 'Profile',
          },
          {
            icon: <CalendarOutlined />,
            label: 'Events',
            children: [
              {
                key: 'create/workshop',
                icon: <PlusCircleOutlined />,
                label: 'Create',
              },
              {
                key: 'workshops',
                icon: <MdEvent />,
                label: 'Workshops',
              },

            ],
          },
          {
            key: 'created/workshop/my',
            icon: <MdEvent />,
            label: 'My Events',
          },

        ];
      case "staff":
        return [
          {
            key: 'staff/dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
          },
          {
            key: 'staff/profile',
            icon: <ProfileOutlined />,
            label: 'Profile',
          },
          {
            icon: <CalendarOutlined />,
            label: 'Events',
            children: [
              {
                key: 'workshop/register',
                icon: <PlusCircleOutlined />,
                label: 'Register',
              },
              {
                key: 'staff/workshops',
                icon: <MdEvent />,
                label: 'Workshops',
              },
              {
                key: 'staff/completed/workshops',
                icon: <CheckCircleOutlined />,
                label: 'Completed',
              },
            ],
          },
        ];
      default:
        return [];
    }
  };

  const handleMenuItemClick = (key) => {
    navigate(`/${key}`);
    setSelected(key);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        backgroundColor: "#001529",
        minHeight: '100vh',
        transition: 'all 0.2s',
      }}
    >
      <div className="demo-logo-vertical" />
      <h1 className='text-white font-bold m-3 flex flex-row'>
        <img src={imgsrc} className="h-8 w-auto mr-4" alt="logo" />
        <span className='mt-1 ml-1'>WorkshopHub</span>
      </h1>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selected]}
        onClick={({ key }) => handleMenuItemClick(key)}
        items={getMenuItems()}
      />
    </Sider>
  );
}

export default SiderBar;
