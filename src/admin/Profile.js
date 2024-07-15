import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Badge } from "antd";
import { Design } from "../layout/design";
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
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
// import e from "cors";
const { RangePicker } = DatePicker;
dayjs.extend(utc);
const dateFormat = 'YYYY-MM-DD';
// const { TextArea } = Input;
// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  console.log('date');
  console.log(`${year}-${month}-${day}`);
  return `${year}-${month}-${day}`;
};

export const Profile = () => {
  const [date1, setDate] = useState(new Date());
  const email = localStorage.getItem('email');
  const [fileList, setFileList] = useState([]);
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
  const initialError = {
    name: { required: false },
    email: { required: false },
    dob: { required: false },
    gender: { required: false },
    experience: { required: false },
    department: { required: false },
    campus: { required: false },
    image: { required: false }

  }
  const [errors, setErrors] = useState(initialError);
  let hasError = false;
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
    let err = initialError;
    if (user.name === '') {
      err.name.required = true;
      hasError = true;
    }
    if (user.dob === '') {
      err.dob.required = true;
      hasError = true;
    }
    if (user.gender === '') {
      err.gender.required = true;
      hasError = true;
    }
    if (user.department === '') {
      err.department.required = true;
      hasError = true;
    }
    if (user.campus === '') {
      err.campus.required = true;
      hasError = true;
    }
    if (user.image === '') {
      err.image.required = true;
      hasError = true;
    }
    if (user.experience === '') {
      err.experience.required = true;
      hasError = true;
    }

    if (!hasError) {
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
      const res = await axios.put('http://localhost:5000/api/workshop/user/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true

      });

      console.log(res);
    }
    setErrors({ ...err });
  }

  var momentDate;
  useEffect(() => {
    const fetchData = async () => {
      const User = await axios.get('http://localhost:5000/api/workshop/user', {
        withCredentials: true
      });
      // console.log(User.data.user);
      setUser(User.data.user);
      console.log("data");
      console.log(moment(User.data.user.dob));
      momentDate = formatDate(User.data.user.dob);
      console.log('momentdate' + momentDate);
      setDate(formatDate(User.data.user.dob));

    }
    fetchData();
  }, []);

  return <Design>
    <section className="flex flex-col items-center justify-center">
      <h1>Profile page</h1>
      {/* <Badge status="success" text="Workshop Scheduled" /> */}
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

      >


        <Form.Item label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            }
          ]} >
          <Input name="name" value={user.name} onChange={(e) => { handleChange(e.target.name, e.target.value) }} />
          {errors.name.required ? <span>Name is required!</span> : null}
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
          {errors.gender.required ? <span>Gender is required!</span> : null}
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
  </Design>
}