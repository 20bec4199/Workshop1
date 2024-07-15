// import React from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
// const onFinish = (values) => {
//   console.log('Success:', values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };
// const Form1 = () => (
//   <Form
//     name="basic"
//     labelCol={{
//       span: 8,
//     }}
//     wrapperCol={{
//       span: 16,
//     }}
//     style={{
//       maxWidth: 600,
//     }}
//     initialValues={{
//       remember: true,
//     }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item
//       label="Username"
//       name="username"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your username!',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Password"
//       name="password"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your password!',
//         },
//       ]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item
//       name="remember"
//       valuePropName="checked"
//       wrapperCol={{
//         offset: 8,
//         span: 16,
//       }}
//     >
//       <Checkbox>Remember me</Checkbox>
//     </Form.Item>

//     <Form.Item
//       wrapperCol={{
//         offset: 8,
//         span: 16,
//       }}
//     >
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// );
// export default Form1;


import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Avatar,
  Form,
  Checkbox,
  Radio,
  Input,
  Select,

  DatePicker,


  Upload,
  Button,
  message,


} from 'antd';
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
// import e from "cors";
const { RangePicker } = DatePicker;
// const { TextArea } = Input;
// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };
const Form1 = () => {
  const email = localStorage.getItem('email');
  const [fileList, setFileList] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    experience: "",
    department: "",
    campus: "",
    designation: "",
    imageData: []

  });
  const initialError = {
    name: { required: false },
    email: { required: false },
    dob: { required: false },
    gender: { required: false },
    experience: { required: false },
    department: { required: false },
    campus: { required: false },

  }
  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
    console.log(user);
    console.log(user.department);
  }
  const handleDepartment = (value) => {
    handleChange('department', value);
  }
  const handleExperience = (value) => {
    handleChange('experience', value);
  }
  const handleDate = (value) => {
    handleChange('dob', value);
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleImage = ({ fileList }) => {
    setFileList(fileList);
    console.log("file " + fileList);
  };
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('dob', user.dob);
    formData.append('gender', user.gender);
    formData.append('department', user.department);
    formData.append('experience', user.experience);
    formData.append('designation', user.designation);
    formData.append('campus', user.campus);

    fileList.forEach((file) => {
      formData.append('image', file.originFileObj);
    });
    console.log(user.campus);
    console.log(formData);
    const res = await axios.put(`http://localhost:5000/api/workshop/user/${email}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }

    });

    console.log(res);
  }


  useEffect(() => {
    const fetchData = async () => {
      const User = await axios.get(`http://localhost:5000/api/workshop/user/${email}`);
      console.log(User.data.user);
      setUser(User.data.user);
      console.log("user");
      console.log(user.dob);
      const momentData = moment(user.dob, 'YYYY-MM-DD');
      console.log(momentData);
      console.log(user.imageData);

    }
    fetchData();
  }, []);

  return <>
    <section className="flex flex-col items-center justify-center">
      <h1>Profile page</h1>
      <Avatar size={64} src={`data:image/jpeg; base64 ,${user.imageData} `} className="mb-8 mt-4" />
      {/* <h1>Name: {email}</h1> */}
      <Form size="medium"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="horizontal"

        style={{
          maxWidth: 1000,
          width: "350px"
        }}
        onFinish={handleSubmit}
      // onFinishFailed={onFinishFailed}
      >


        <Form.Item label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            }
          ]} >
          <Input name="name" value={user.name} onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
        </Form.Item>
        <Form.Item label="Gender"
          rules={[
            {
              required: true,
              message: 'Please select your gender!',
            }
          ]}
        >
          <Radio.Group name="gender" value={user.gender} onChange={(e) => { handleChange(e.target.name, e.target.value) }}>
            <Radio value="Male"> Male </Radio>
            <Radio value="Female"> Female </Radio>

          </Radio.Group>
        </Form.Item>
        <Form.Item label="Dob"
          rules={[
            {
              required: true,
              message: 'Please select your date of birth!',
            }
          ]}

        >
          <DatePicker name="dob" onChange={handleDate} defaultValue={user.dob} />
        </Form.Item>
        <Form.Item label="Email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input name="email" value={user.email} onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
        </Form.Item>

        <Form.Item label="Department"
          rules={[
            {
              required: true,
              message: 'Please select your department!',
            }
          ]}
        >
          <Select name='department' value={user.department} onChange={handleDepartment}>
            <Select.Option value="ECE">ECE</Select.Option>
            <Select.Option value="EEE">EEE</Select.Option>
            <Select.Option value="CSE">CSE</Select.Option>
            <Select.Option value="MECH">MECH</Select.Option>
            <Select.Option value="CIVIL">CIVIL</Select.Option>
            <Select.Option value="IT">IT</Select.Option>
            <Select.Option value="CSBS">CSBS</Select.Option>
            <Select.Option value="AIDS">AIDS</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Experience"
          rules={[
            {
              required: true,
              message: 'Please select your experience!',
            }
          ]}
        >
          <Select name="experience" value={user.experience} onChange={handleExperience}>
            <Select.Option value="0-1">0 to 1 year</Select.Option>
            <Select.Option value="1-3">1 to 3 years</Select.Option>
            <Select.Option value="3">Above 3 years</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Designation"
          rules={[
            {
              required: true,
              message: 'Please enter your designation!',
            }
          ]}
        >
          <Input name="designation" value={user.designation} onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
        </Form.Item>
        <Form.Item label="Campus"
          rules={[
            {
              required: true,
              message: 'Please enter your campus!',
            }
          ]}
        >
          <Input name="campus" value={user.campus} onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
        </Form.Item>

        <Form.Item label="Image"
          rules={[
            {
              required: true,
              message: 'Please upload your image',
            }
          ]}
        >
          <Upload fileList={fileList}
            onChange={handleImage}
            beforeUpload={() => false}>
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>

        {/* <Form.Item>
          <Button type="primary" danger htmlType="reset">
            Clear
          </Button>
        </Form.Item> */}
        <Form.Item className="flex justify-center" >
          <Button type="primary" htmlType="submit" >
            Update
          </Button>
        </Form.Item>



      </Form>
    </section>
  </>
}

export default Form1;