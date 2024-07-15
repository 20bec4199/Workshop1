import { Button, Layout, Menu, theme, Affix, FloatButton, message, Avatar, Tag } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { Header } = Layout;
const HeaderBar = ({ collapsed, toggleCollapsed }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    dob: " ",
    gender: "",
    experience: "",
    department: "",
    campus: "",
    designation: "",
    imageData: []

  });
  const [colour, setColour] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await axios.post('http://localhost:5000/api/workshop/logoutUser', {}, {
      withCredentials: true
    });
    localStorage.removeItem('token');
    message.success("Logged out Successfully!");
    return navigate('/');
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const users1 = await axios.get('http://localhost:5000/api/workshop/user', {
          withCredentials: true
        });

        setUser(users1.data.user);


      }

      catch (error) {
        console.log(error);

      }
      finally {

      }

    }
    fetchUserData();
  }, []);

  return <>
    <Header
      style={{
        display: 'flex',
        padding: 0,
        background: colorBgContainer,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '16px'


      }}

    >

      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,

        }}

      />

      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        {user.imageData ? (
          <Avatar className='ml-20 mr-5' src={`data:image/jpeg; base64 ,${user.imageData} `} icon={<UserOutlined />}></Avatar>) :
          (
            <Avatar className='ml-20 mr-5' icon={<UserOutlined />}></Avatar>
          )

        }
        {user &&
          <Tag color='#a855f7'>{user.name}</Tag>

        }
        <Button onClick={handleLogout} type="primary" style={{ backgroundColor: 'red', borderColor: 'red', right: '0' }} >Logout</Button>
      </div>
    </Header>

  </>
}

export default HeaderBar;