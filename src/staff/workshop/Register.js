import { useEffect, useState } from "react";
import axios from 'axios';
import { Tag, Calendar } from 'antd';
import dayjs from 'dayjs';
import { Design } from "../../layout/design";
import RegisterModal from "./RegisterModal";
import { Descriptions } from 'antd';


export const RegisterWorkshop = () => {
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [visible, setVisible] = useState(false);
  const [workshopData, setWorkshopData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [registeredWorkshops, setRegisteredWorkshops] = useState([]);
  const [registeredData, setRegisteredData] = useState(null);
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    dob: " ",
    gender: "",
    experience: "",
    department: "",
    campus: "",
    designation: "",
    imageData: [],
    role: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/workshop/user', {
          withCredentials: true
        });
        setUser(response.data.user);
        setSelectedCampus(response.data.user.campus);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);



  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/workshop/get/workshops/${selectedCampus}`, {
          withCredentials: true
        });
        setWorkshops(response.data.workshops);
        const response2 = await axios.get('http://localhost:5000/api/workshop/get/registered/user/workshops', {
          withCredentials: true
        });
        console.log(response2.data.workshopDetails);
        console.log(response.data.workshops);
        setRegisteredWorkshops(response2.data.workshopDetails);
      }
      catch (error) {
        console.log(error);
      }


    }
    if (selectedCampus) {
      getWorkshops();
    }
  }, [selectedCampus]);



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
    const today = new Date().setHours(0, 0, 0, 0);
    const currentDate = new Date(value.year(), value.month(), value.date()).getTime();
    const isPast = currentDate < today;

    const currentDayWorkshops = workshops.filter(workshop => {
      const workshopDate = new Date(workshop.date).toISOString().split('T')[0];
      return workshopDate === date;

    });

    const registeredWorkshop = registeredWorkshops.filter(reg => {
      const regDate = new Date(reg.date).toISOString().split('T')[0];
      return regDate === date;
    });
    // console.log(registeredWorkshop);


    return (
      <div onClick={() => showModal(value)} className="workshop-cell">
        <ul className="events">
          {currentDayWorkshops.map(workshop => (
            <li key={workshop._id}>
              <Tag color={isPast ? '#16a34a' : '#108ee9'}>{workshop.title}</Tag>

            </li>
          ))}
          {registeredWorkshop.map(reg => (
            <li key={reg._id}>
              <Tag color={
                reg.status === 'Registered' ? 'blue' :
                  reg.status === 'Not-Attended' ? 'red' :
                    reg.status === 'Certified' ? 'green' : 'default'
              }>
                {reg.status}
              </Tag>
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
    const existingRegister = registeredWorkshops.find(workshop => {
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
    if (existingRegister) {
      setRegisteredData(existingRegister);
      setFlag(true);
    }
    else {
      setRegisteredData(null);
      setFlag(false);
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
    // console.log('Create Workshop values:', values);
    // const response = await axios.post(`http://localhost:5000/api/workshop/create/workshop/${selectedCampus}`, values, {
    //   withCredentials: true
    // })
    // console.log(response);
    // setVisible(false);
    // setSelectedDate(null);
    // setWorkshopData(null);
    // const UpdatedWorkshops = await axios.get(`http://localhost:5000/api/workshop/get/workshops/${selectedCampus}`, {
    //   withCredentials: true
    // });
    // setWorkshops(UpdatedWorkshops.data.workshops);
    // // getWorkshops();
  };

  const handleUpdateWorkshop = async (values) => {
    // console.log('Update Workshop values:', values);
    // const response = await axios.put(`http://localhost:5000/api/workshop/update/workshop/${values.id}`, values, {
    //   withCredentials: true
    // });
    // console.log(response);
    // setVisible(false);
    // setSelectedDate(null);
    // setWorkshopData(null);
    // const UpdatedWorkshops = await axios.get(`http://localhost:5000/api/workshop/get/workshops/${selectedCampus}`, {
    //   withCredentials: true
    // });
    // setWorkshops(UpdatedWorkshops.data.workshops);
  };


  return (
    <Design>

      <div>

        {/* <Button icon={<BackwardOutlined />} size='large' shape="square" className='flex px-8 w-20 mb-3' onClick={handleBack} /> */}
        <Calendar onSelect={onSelect} onPanelChange={onPanelChange} dateCellRender={dateCellRender} disabledDate={disabledDate} />
        {workshopData && <RegisterModal
          visible={visible}
          workshopData={workshopData}
          setWorkshopData={setWorkshopData}
          selectedDate={selectedDate}
          registeredData={registeredData}
          setSelectedDate={setSelectedDate}
          onCreate={handleCreateWorkshop}
          flag={flag}
          onUpdate={handleUpdateWorkshop}
          onCancel={handleCancel} />}
      </div>



    </Design>
  );
};