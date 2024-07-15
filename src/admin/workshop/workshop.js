import React, { useEffect, useState } from 'react';
import { Calendar, Tag, FloatButton, Button, Badge, Breadcrumb, message } from 'antd';
import { BackwardOutlined } from '@ant-design/icons';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import { Design } from '../../layout/design';
import WorkshopFormModal from './WorkshopFormModal';
import moment from 'moment';
import dayjs from 'dayjs';



const campuses = [
  {
    name: 'KTR',
    value: 2,
  },
  {
    name: 'RMP',
    value: 2,
  },
  {
    name: 'VDP',
    value: 2,
  },
  {
    name: 'NCR',
    value: 2,
  },
  {
    name: 'TPJ',
    value: 2,
  },
];

const data = {
  name: 'Campuses',
  children: campuses,
};
export const Workshop = () => {
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [visible, setVisible] = useState(false);
  const [workshopData, setWorkshopData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const cookie = document.cookie;
  console.log(cookie);
  const token = localStorage.getItem('token');
  console.log(token);

  useEffect(() => {
    const getWorkshops = async () => {
      const response = await axios.get(`http://localhost:5000/api/workshop/get/workshops/${selectedCampus}`, {
        withCredentials: true
      });

      setWorkshops(response.data.workshops);

    }
    if (selectedCampus) {
      getWorkshops();
    }
  }, [selectedCampus]);

  const options = {
    color: ['#0e7490', '#0e7490', '#0e7490', '#0e7490', '#0e7490'],
    series: {
      type: 'sunburst',
      data: [data],
      radius: [0, '90%'],
      label: {
        rotate: 'radial',
      },
    },
  };

  const onChartClick = (params) => {
    if (params.data && params.data.name) {
      setSelectedCampus(params.data.name);
      console.log(params.data.name);
    }
  };

  const handleBack = () => {
    setSelectedCampus(null);
  }

  const onSelect = (value) => {
    console.log("onselect");
    console.log(value.format('YYYY-MM-DD'));
    setSelectedDate('hrll');
    console.log(selectedDate);

    showModal(value);
    // setVisible(true);
  }

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const disabledDate = (current) => {
    if (!current) return false;

    // Get today's date and the start of the current year
    const today = dayjs().startOf('day');
    const currentYear = dayjs().year();

    // Disable dates before today and dates outside the current year
    return current.isBefore(today) || current.year() !== currentYear;
  };

  const dateCellRender = (value) => {
    // console.log(value);
    if (value.day() === 0) {
      return (
        <div>

          <Tag color='volcano'>Holiday</Tag>
        </div>
      )
    }

    const date = value.format('YYYY-MM-DD');
    const today = new Date().setHours(0, 0, 0, 0); // Start of today
    const currentDate = new Date(value.year(), value.month(), value.date()).getTime();
    const isPast = currentDate < today;

    const currentDayWorkshops = workshops.filter(workshop => {
      const workshopDate = new Date(workshop.date).toISOString().split('T')[0];
      return workshopDate === date;
    });

    return (
      <div onClick={() => showModal(value)} className="workshop-cell">
        <ul className="events">
          {currentDayWorkshops.map(workshop => (
            <li key={workshop._id}>
              {isPast ? <Tag color='#16a34a'>{workshop.title}</Tag>
                : <Tag color='#108ee9'>{workshop.title}</Tag>}

            </li>
          ))}
        </ul>
      </div>
    );
  };

  const showModal = (value) => {

    console.log('Clicked date:', value.format('YYYY-MM-DD'));
    const dateStr = value.format('YYYY-MM-DD');
    setSelectedDate(dateStr);
    console.log(selectedDate);
    const existingWorkshop = workshops.find(workshop => {
      const workshopDate = new Date(workshop.date).toISOString().split('T')[0];
      return workshopDate === value.format('YYYY-MM-DD');
    });
    console.log('shomodal');
    console.log(existingWorkshop);
    if (existingWorkshop) {
      setWorkshopData(existingWorkshop);
    }
    else {
      setWorkshopData(null);
    }

    setVisible(true);
  };

  const handleCancel = () => {
    console.log('cancelled');
    setVisible(false);
    setSelectedDate(null);
    setWorkshopData(null);
    console.log(workshopData);
  };

  const handleCreateWorkshop = async (values) => {
    console.log('Create Workshop values:', values);
    const response = await axios.post(`http://localhost:5000/api/workshop/create/workshop/${selectedCampus}`, values, {
      withCredentials: true
    });
    if (response.data.success) {
      message.success('Workshop created successfully');
    }
    console.log(response);
    setVisible(false);
    setSelectedDate(null);
    setWorkshopData(null);

    const UpdatedWorkshops = await axios.get(`http://localhost:5000/api/workshop/get/workshops/${selectedCampus}`, {
      withCredentials: true
    });
    setWorkshops(UpdatedWorkshops.data.workshops);
    // getWorkshops();
  };

  const handleUpdateWorkshop = async (values) => {
    console.log('Update Workshop values:', values);
    const response = await axios.put(`http://localhost:5000/api/workshop/update/workshop/${values.id}`, values, {
      withCredentials: true
    });
    console.log(response);
    setVisible(false);
    setSelectedDate(null);
    setWorkshopData(null);
    if (response.data.success) {
      message.success('Workshop updated successfully');
    }
    const UpdatedWorkshops = await axios.get(`http://localhost:5000/api/workshop/get/workshops/${selectedCampus}`, {
      withCredentials: true
    });
    setWorkshops(UpdatedWorkshops.data.workshops);
  };


  return (
    <Design>
      {selectedCampus ?
        <div>
          <Breadcrumb>
            <Breadcrumb.Item onClick={handleBack} className='hover:cursor-pointer'>{selectedCampus}</Breadcrumb.Item>
            <Breadcrumb.Item>Calendar</Breadcrumb.Item>
          </Breadcrumb>
          {/* <Button icon={<BackwardOutlined />} size='large' shape="square" className='flex px-8 w-20 mb-3' onClick={handleBack} /> */}
          <Calendar onSelect={onSelect} onPanelChange={onPanelChange} dateCellRender={dateCellRender} disabledDate={disabledDate} />
          <WorkshopFormModal
            visible={visible}
            workshopData={workshopData}
            setWorkshopData={setWorkshopData}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onCreate={handleCreateWorkshop}
            onUpdate={handleUpdateWorkshop}
            onCancel={handleCancel} />
        </div> :
        <div className='flex justify-center items-center h-screen mx-auto '>

          <ReactECharts
            option={options}
            style={{ height: '80%', width: '70%' }}
            onEvents={{
              click: onChartClick,
            }}
            theme='my_theme'
          />
        </div>
      }

    </Design>
  );
};






