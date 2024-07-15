import React, { useState, useEffect, useRef } from 'react';
import { Breadcrumb, Layout, Menu, theme, Space, Modal, Affix } from 'antd';
import imgsrc1 from '../images/background.png';
import about from '../images/about.png';
import { Link } from 'react-router-dom';
import { Login } from '../Authentication/Login';
import Register from '../Authentication/Register';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const { Header, Content, Footer } = Layout;

const DynamicTyping = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState('');


  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(text.substring(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === text.length) {
        clearInterval(typingInterval);
      }
    }, speed); // Speed in milliseconds

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};



const Home = ({ setIsAuthenticated, isAuthenticated, setUserData }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const navigate = useNavigate();

  useEffect(() => {
    const token1 = localStorage.getItem('token');
    console.log(token1);


    if (token1) {
      return navigate("/dashboard");
    }
    else {
      return navigate("/");
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRegister, setIsModalRegister] = useState(false);
  const showModal1 = () => {
    setIsModalRegister(true);
  };
  const handleCancel1 = () => {
    setIsModalRegister(false);
  };
  const modalRegister = () => {
    setIsModalOpen(!isModalOpen);
    setIsModalRegister(!isModalRegister);

  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is in view
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    else if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
      else if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };




  return (

    <Layout>
      <Affix offsetTop={0}>
        <Layout>
          <Header
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 5,
              backgroundColor: '#001529'
            }}

          >
            <div className="pr-80 w-7/12" >
              <h1 className='text-white font-bold text-2xl'>WorkshopHub</h1>
            </div>
            <div className='w-5/12'>
              <Menu

                mode="horizontal"
                defaultSelectedKeys={['0']}
                //   items={items}
                style={{
                  flex: 1,
                  minWidth: 0,
                  backgroundColor: '#001529'
                }}
                className='ml-16'

              >


                <Menu.Item key='1' className=''>
                  <h1 className='text-white font-bold  mr-4' onClick={() => scrollToSection('home')}>Home</h1>
                </Menu.Item>
                <Menu.Item key='2' >

                  <h1 className='text-white font-bold mr-4' onClick={() => scrollToSection('about')}>About</h1>

                </Menu.Item>
                <Menu.Item key='3' >
                  <h1 className='text-white font-bold mr-4'>Contact</h1>
                </Menu.Item>
                <Menu.Item key='4'  >
                  <div className='flex flex-row'>
                    <h1 className='text-white font-bold mr-2' onClick={showModal}>Login / </h1>
                    <h1 className='text-white font-bold' onClick={showModal1}> Register</h1>
                  </div>
                </Menu.Item>


              </Menu>
            </div>
          </Header>
        </Layout>
      </Affix>
      <Layout>
        <div className=''>
          <Content
            style={{
              padding: '0 48px',

            }}


          >

            {/* Modal content */}
            <Modal open={isModalOpen}
              footer={null}
              onCancel={handleCancel}
              className="flex items-center  top-20 mt-16 justify-center "

            >
              <Login isModalOpen={isModalOpen} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setUserData={setUserData} />
              <h2>Create new account <button className='text-blue-400 ml-1' onClick={modalRegister}>register</button></h2>
            </Modal>
            <Modal open={isModalRegister}
              footer={null}
              onCancel={handleCancel1}
              className="flex items-center   top-10 mt-8 justify-center "

            >
              <Register />
              <h2>Already have an account?<button className='text-blue-400 ml-1' onClick={modalRegister}>Login</button></h2>
            </Modal>


            {/* Home content */}
            <section id='home' className='h-screen'>
              <div className='flex flex-row'>
                <div className='w-1/2'>
                  <img src={imgsrc1} className='w-full h-full' alt='Home_image' />
                </div>
                <div className='flex items-center justify-center w-1/2'>
                  <h1 className='flex text-xl ml-8 '><span className='ml-2  '><DynamicTyping text="Welcome to  WorkshopHub, where learning meets innovation. Register now for our upcoming workshops and unlock new opportunities!" speed={50} /></span></h1>
                </div>
              </div>
            </section>

            {/* About section */}
            <section id="about" className="h-screen" ref={aboutRef}>
              <h2 className=' text-3xl font-bold border-b-4 w-[140px] border-primary border-blue-500 rounded-md'>About Us</h2>
              <div className='flex flex-row'>
                <div className='flex items-center justify-center left-0 w-1/2'>
                  {isVisible && (
                    <h1 className='flex text-xl ml-8 '><span className='ml-2  '><DynamicTyping text="At WorkshopHub, we're passionate about empowering individuals through education. Our mission is to provide high-quality workshops that inspire growth, creativity, and lifelong learning." speed={50} /></span></h1>
                  )}
                </div>
                <div className='w-1/2'>
                  <img src={about} className='w-4/5 h-4/5 ml-20 ' alt='About_image'></img>
                </div>



              </div>
            </section>

          </Content>
        </div>
      </Layout>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default Home;