import { Link, Navigate, useNavigate } from "react-router-dom";
import { Space, Speace, message, Select } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import { MailOutlined, CalendarOutlined, LockOutlined, BankOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from "axios";


const Register = () => {
  const navigate = useNavigate();
  const initialError = {
    name: { required: false },
    email: { required: false },
    dob: { required: false },
    campus: { required: false },
    password: { required: false },
    cpassword: { required: false },
    customError: null
  }
  let hasError = false;

  const [input, Setinput] = useState({
    name: "",
    dob: "",
    email: "",
    campus: "",
    password: "",
    cpassword: ""
  });

  const [errors, Seterror] = useState(initialError);

  const handleChange = (name, value) => {
    Setinput({ ...input, [name]: value });
    console.log(input);
    console.log(input.campus);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = initialError;
    if (input.name === '') {
      errors.name.required = true;
      hasError = true;
    }
    if (input.dob === '') {
      errors.dob.required = true;
      hasError = true;
    }
    if (input.email === '') {
      errors.email.required = true;
      hasError = true;
    }
    if (input.campus === '') {
      errors.campus.required = true;
      hasError = true;
    }
    if (input.password === '') {
      errors.password.required = true;
      hasError = true;
    }
    if (input.cpassword === '') {
      errors.cpassword.required = true;
      hasError = true;
    }
    if (!hasError) {
      try {
        console.log(input);
        const register = await axios.post('http://localhost:5000/api/workshop/user/register', input);
        console.log(input);
        if (register.data.success) {
          message.success('Registered Successfully');
        }
        Setinput({
          name: "",
          dob: "",
          email: "",
          password: "",
          cpassword: "",
          campus: ""
        });
        return navigate('/');

      } catch (error) {
        console.log(error);
      }
    }



    console.log("form submitted");





    Seterror({ ...errors });
    console.log(errors);
  }
  const handleReset = () => {
    Seterror(initialError);

    hasError = false;

  }

  const handleDepartment = (value) => {
    handleChange('campus', value);
  }


  return <>

    <section className="flex items-center justify-center ">
      <div className=" rounded-md mb-4 w-72  flex flex-col items-center  pt-4 pr-3 pb-4 pl-4">

        <form className="flex flex-col" method="post" onSubmit={handleSubmit} >

          <h1 className="text-center font-content-font text-blue-950 text-3xl font-bold mb-5 mt-4">Register</h1>
          <Input className="mb-4 bg-gray-200" onChange={(e) => { handleChange(e.target.name, e.target.value) }} name="name" value={input.name}
            placeholder="Enter your username"
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
          {errors.name.required ? (<span className="text-red-500">Name field is required!</span>) : null}

          <Input className="mb-4 bg-gray-200" type="date" onChange={(e) => { handleChange(e.target.name, e.target.value) }} name="dob" value={input.dob}
            placeholder="Enter your DateofBirth"
            prefix={<CalendarOutlined className="site-form-item-icon" />}
          />
          {errors.dob.required ? (
            <span className="text-red-500">DateofBirth field is required!</span>) : null}
          <Input className="mb-4 bg-gray-200" onChange={(e) => { handleChange(e.target.name, e.target.value) }} name="email" value={input.email}
            placeholder="Enter your email"
            prefix={<MailOutlined className="site-form-item-icon" />}
          />
          {errors.email.required ? (
            <span className="text-red-500">Email field is required!</span>) : null}

          <Select name='campus' value={input.campus} onChange={handleDepartment} className="mb-4 bg-gray-200" placeholder='Please select your' >
            <Select.Option value="KTR">KTR</Select.Option>
            <Select.Option value="NCR">NCR</Select.Option>
            <Select.Option value="VDP">VDP</Select.Option>
            <Select.Option value="RMP">RMP</Select.Option>
            <Select.Option value="TPJ">TPJ</Select.Option>
          </Select>
          {errors.campus.required ? (<span className="text-red-500">Campus field is required!</span>) : null}

          <Input className="mb-4 bg-gray-200" type="password" onChange={(e) => { handleChange(e.target.name, e.target.value) }} name="password"
            placeholder="New password" value={input.password}
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
          {errors.password.required ? (
            <span className="text-red-500">Password field is required!</span>) : null}

          <Input className="mb-4 bg-gray-200" type="password" onChange={(e) => { handleChange(e.target.name, e.target.value) }} name="cpassword"
            placeholder="Confirm password" value={input.cpassword}
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
          {errors.cpassword.required ? (
            <span className="text-red-500">Confirm_password field is required!</span>) : null}
          {errors.customError ? (<span>{errors.customError}</span>) : null}

          <div className="flex flex-row gap-16 items-center justify-center">
            <button type="reset" className="bg-red-400 text-white px-4 py-2 rounded-md hover:translate-y-1" onClick={handleReset}>clear</button>
            <button type="submit" className="bg-blue-800 text-white rounded-md px-6 py-2 hover:translate-y-1">Register</button>


          </div>
        </form>
      </div>

    </section>
  </>
}

export default Register;