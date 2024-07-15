import { useEffect, useState } from 'react';
import React from 'react';
import { Line } from '@ant-design/charts';
import { Column } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';
import { Row, Col, Tag } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
// import {Design} from '../Layout/Design';
import { Design } from '../layout/design';
import { SunburstChart, Label, Polygon } from 'recharts';
import ReactDOM from 'react-dom';
import {
  UserOutlined, CalendarOutlined, DashboardOutlined
} from '@ant-design/icons';
const DATA = ['KTR', 'RMP', 'VDP', 'NCR', 'TPJ'];
const DemoColumn = ({ data1 }) => {
  const [data, setData] = React.useState(DATA);

  React.useEffect(() => {
    const time = setInterval(() => {
      setData([
        ...DATA.sort(() => {
          return Math.random() - 0.5;
        }),
      ]);
    }, 2000);
    return () => clearInterval(time);
  }, []);

  const config = {
    data: [
      { index: 'KTR', value: data1.KTR },
      { index: 'RMP', value: data1.RMP },
      { index: 'VDP', value: data1.VDP },
      { index: 'NCR', value: data1.NCR },
      { index: 'TPJ', value: data1.TPJ },
    ],
    xField: 'index',
    yField: 'value',
  };
  return <Column {...config} />;
};

const DemoPie = ({ data1 }) => {

  const config = {

    data: [

      { type: 'KTR', value: data1.KTR },
      { type: 'RMP', value: data1.RMP },
      { type: 'VDP', value: data1.VDP },
      { type: 'NCR', value: data1.NCR },
      { type: 'TPJ', value: data1.TPJ },

    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 10,
      },
    },
  };
  return <Pie {...config} />;
};

export const Dashboard = () => {
  const [workshopcount, setWorkshopCount] = useState(null);
  const [value, setValue] = useState([]);

  useEffect(() => {
    const fetchCount = async () => {
      const count = await axios.get('http://localhost:5000/api/workshop/get/workshop/count', {
        withCredentials: true
      });
      console.log(count.data.counts);

      setWorkshopCount(count.data.counts);

    }

    const fetchUserCount = async () => {
      const userCount = await axios.get('http://localhost:5000/api/workshop/count/users', {
        withCredentials: true
      });
      setValue(userCount.data.counts);
    }
    fetchUserCount();
    fetchCount();
    const intervalId = setInterval(fetchCount, 60000); // Fetch data every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const users1 = await axios.get('http://localhost:5000/api/workshop/user', {
        withCredentials: true
      });
      console.log(users1);

    }


    fetchUserData();
  })


  return (
    <Design>
      <Tag color="#108ee9" icon={<DashboardOutlined />}>Dashboard</Tag>

      {workshopcount &&
        <Row>
          <Col span={2}>

          </Col>
          <Col span={8}>
            <div className='flex justify-center'>
              <Tag icon={<CalendarOutlined />}>Campus wise Workshop Count</Tag>
            </div>
            <DemoPie data1={workshopcount} />

          </Col>
          <Col span={6}>
          </Col>

          <Col span={8}>
            <div className='flex justify-center'>
              <Tag icon={<UserOutlined />}>Campus wise faculty count</Tag>
            </div>
            <DemoColumn data1={value} />
          </Col>

        </Row>
      }
    </Design>
  );
}