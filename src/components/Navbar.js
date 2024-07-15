import React, { useEffect, useState } from 'react';
import imgsrc from '../images/images.png';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from '../admin/Dashboard';
import { Profile } from '../admin/Profile';
import { Workshop } from '../admin/workshop/workshop';
import { Calendar1 } from '../practice/calendar';
import { MdEvent } from "react-icons/md";
import axios from 'axios';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
  LogoutOutlined,
  ProfileOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Affix, FloatButton } from 'antd';
const { Header, Sider, Content } = Layout;
const Navbar = ({ setIsAuthenticated, isAuthenticated, setUserData, userData }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [click, setClick] = useState({
    dashboard: true,
    profile: false,
    workshop: false,

  })
  const navigate = useNavigate();
  useEffect(() => {
    const token1 = localStorage.getItem('token');
    if (token1) {
      setIsAuthenticated(true);
    }
    else {
      setIsAuthenticated(false);
    }
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  const logout = async () => {
    console.log('logout');
    const response = await axios.post('http://localhost:5000/api/workshop/logoutUser', {}, {
      withCredentials: true
    });
    console.log(response);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    return navigate('/');
  }

  const handleClick = (key) => {
    console.log(click);
    console.log(key);
    if (key.key == '1') {

      setClick((prevUser) => ({
        ...prevUser,
        dashboard: true,
        profile: false
      }));

    }
    else if (key.key === '3') {
      setClick({
        dashboard: false,
        profile: true,
      });
    }
    else if (key.key === '9') {
      setClick({
        dashboard: false,
        profile: false,
        workshop: true,
      });
    }
  }


  return (
    <Layout>
      <Affix offsetTop={0} >
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: "#001529", minHeight: '100vh' }}>
          <div className="demo-logo-vertical" />
          <h1 className='text-white font-bold m-3 flex flex-row'><img src={imgsrc} className="h-8 w-auto mr-4"></img><span className='mt-1 ml-1'>WorkshopHub</span></h1>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key='1' icon={<DashboardOutlined />} onClick={(key) => { handleClick(key) }}>
              Dashboard
            </Menu.Item>
            <Menu.SubMenu key='2' icon={<UserOutlined />} title="User" style={{ backgroundColor: "#001529" }}>
              <Menu.Item key='3' icon={<ProfileOutlined />} onClick={(key) => { handleClick(key) }} >
                Profile
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key='5' icon={<CalendarOutlined />} title="Events">
              <Menu.Item key='9' icon={<MdEvent />} onClick={(key) => { handleClick(key) }} >
                Workshop
              </Menu.Item>
              <Menu.Item key='6' icon={<ClockCircleOutlined />} >
                Pending
              </Menu.Item>
              <Menu.Item key='7' icon={<CheckCircleOutlined />} >
                Completed
              </Menu.Item>

            </Menu.SubMenu>

            <Menu.Item key='8' icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Menu.Item>



          </Menu>
        </Sider>
      </Affix>
      <Layout>
        <Affix offsetTop={0}>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <h2></h2>
          </Header>
        </Affix>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {click.dashboard ? <Dashboard setUserData={setUserData} /> : null}
          {click.profile ? <Profile /> : null}
          {click.workshop ? <Workshop /> : null}

          <FloatButton.BackTop />

        </Content>
      </Layout>
    </Layout>
  );
};
export default Navbar;