import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, InputNumber, Button, Table, Card, Tag, Space, message } from 'antd';
import moment from 'moment';
import { Descriptions } from 'antd';
import axios from 'axios';

const RegisterModal = ({ visible, workshopData, setWorkshopData, selectedDate, setSelectedDate, onCreate, onUpdate, onCancel, registeredData, flag }) => {


  let users = (workshopData.registeredUsers).length;

  console.log(users);

  useEffect(() => {



  }, [workshopData, selectedDate, visible, onCancel]);
  const handleOk = () => {




  };

  const items = [
    {
      label: 'Workshop',
      children: workshopData.title
    }, {
      label: 'Description',
      span: {
        xl: 2,
        xxl: 2,
      },
      children: workshopData.description
    },
    {
      label: 'Date',
      children: workshopData.date
    }
  ];

  const handleRegister = async () => {
    try {
      const register = await axios.post(`http://localhost:5000/api/workshop/register/workshop/${workshopData._id}`, {
        date: workshopData.date
      }, {
        withCredentials: true
      });
      console.log(register);
      if (register.data.success) {
        message.success('Workshop Registered Successfully');
      }
    } catch (error) {
      console.log(error);

    }
    finally {
      onCancel();
    }
  }

  const footer = (
    <div>
      <Space>
        <Button onClick={onCancel} type='primary' danger className='hover:translate-y-1'>Cancel</Button>

        <div>
          {workshopData.maxParticipants > users ? <Button type='primary' className='hover:translate-y-1' onClick={handleRegister} disabled={flag}>Register</Button> : null}
        </div>

      </Space>
    </div>
  )

  return (
    <Modal
      open={visible}
      title='Register Workshop'
      footer={footer}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Card bordered className='hover:bg-grey-200 '>
        <Descriptions bordered column={1}>
          <Descriptions.Item label='Workshop'>{workshopData.title}</Descriptions.Item>
          <Descriptions.Item label='Description'>{workshopData.description}</Descriptions.Item>
          <Descriptions.Item label='Event Date'>{moment(workshopData.date).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label='Workshop Status'><Tag color={workshopData.maxParticipants > users ? '#16a34a' : '#ef4444'}>{workshopData.maxParticipants > users ? 'Available' : 'Full'}</Tag></Descriptions.Item>
          {registeredData &&
            <Descriptions.Item label='Status'><Tag>{registeredData.status}</Tag></Descriptions.Item>
          }
        </Descriptions>
      </Card>

    </Modal>
  );
};

export default RegisterModal;
