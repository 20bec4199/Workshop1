import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InfoCircleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Tooltip, Space, message } from 'antd';
import axios from "axios";


export const Login = ({ setIsAuthenticated, isAuthenticated, isModalOpen, setUserData }) => {

  const navigate = useNavigate();

  const initialError = {
    email: { required: false },
    password: { required: false },
    customError: null
  }

  let hasError = false;

  const [errors, Seterror] = useState(initialError);
  const [input, Setinput] = useState({
    email: "",
    password: ""
  });






  const handleChange = (e) => {
    Setinput({ ...input, [e.target.name]: e.target.value });
    console.log(input)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = initialError;
    if (input.email === '') {
      errors.email.required = true;
      hasError = true;
    }
    if (input.password === '') {
      errors.password.required = true;
      hasError = true;
    }
    console.log("form submitted");
    if (!hasError) {
      try {
        const loginResponse = await axios.post('http://localhost:5000/api/workshop/user/login1', input, {
          withCredentials: true
        });

        console.log("cookie response");
        console.log(loginResponse.data.user);
        localStorage.setItem('token', loginResponse.data.token);
        console.log(loginResponse.data.token);
        console.log("end");
        setIsAuthenticated(true);
        setUserData('user');

        message.success('User logged in successfully!');
        if (loginResponse.data.user.role === 'admin') {
          return navigate('/dashboard');
        }
        else if (loginResponse.data.user.role === 'staff') {
          return navigate('/staff/dashboard');
        }
        console.log("hello");


      } catch (err) {
        console.log(err);
        // let respon = err.response.data.message;
        // message.error(respon);
      }
    }




    Seterror({ ...errors });
    console.log(errors);

  }

  // useEffect(() => {
  //   if(isAuthenticated){
  //     return navigate('/home');
  //   }
  // },[navigate]);

  const handleReset = () => {
    Setinput({
      email: "",
      password: ""
    });
    Seterror(initialError);
    hasError = false;
  }


  return <>
    {/* <section> */}

    <section className="flex  top-0 mt-0 justify-center">
      {/* <div> */}
      <div className="bg-white rounded-lg mb-4 flex flex-col  pt-4 pr-3 pb-4 pl-4 items-center justify-center">

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h1 className="text-center font-bold text-blue-950 font-content-font text-3xl  mb-6 mt-5">Login</h1>
          <Input className="mb-5 bg-gray-200" onChange={handleChange}
            placeholder="Enter your username" name="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Extra information">
                <InfoCircleOutlined
                  style={{
                    color: 'rgba(0,0,0,.45)',
                  }}
                />
              </Tooltip>
            }
          />
          {errors.email.required ? (
            <span className="text-red-500">Email field is required!</span>) : null}
          <Input className="mb-5 bg-gray-200" type="password" onChange={handleChange}
            placeholder="password" name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
          {errors.password.required ? (
            <span className="text-red-500">Password field is required!</span>) : null}
          {errors.customError ? (<span>{errors.customError}</span>) : null}
          <div className="flex items-center justify-center gap-x-16">
            <button className="bg-red-400 text-white px-4 py-2 rounded-md hover:translate-y-1" type="reset" onClick={handleReset}>clear</button>
            <button type="submit" className="bg-blue-800  text-white font-inner-font rounded-md px-6 py-2 hover:translate-y-1">Login</button>
            {/* <Link to="/register"><button className="bg-blue-800 font-inner-font text-white rounded-md px-2 py-2 hover:translate-y-1">Register</button></Link> */}

          </div>
        </form>
      </div>


    </section>
  </>

}


