import React, { useEffect, useState } from 'react';
import { Calendar, Tag } from 'antd';
import axios from 'axios';
export const Calendar1 = () => {
  const [user, setUser] = useState("");
  const email = localStorage.getItem('email');
  const [block, setBlock] = useState("");


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const User = await axios.get(`http://localhost:5000/api/workshop/user/${email}`);
  //     setUser(User.data.user);
  //     console.log("calendar");
  //     console.log(user);

  //     console.log("user");
  //   }
  //   fetchData();
  //   if(user.experience =='0-1'){

  //     setBlock(4);
  //     console.log(block);
  // }
  // if(user.experience == '1-3'){
  //   setBlock(8);
  //   console.log(block);
  // }
  // },[setUser]);

  //   const onPanelChange = (value, mode) => {
  //     console.log(value.format('YYYY-MM-DD'), mode);
  //   };

  //   const onSelect = (value) => {
  //     console.log(value.format('YYYY-MM-DD'));
  //   }

  // const onChange = (value) => {
  //   console.log("onchange"+value.format('YYYY-MM-DD'));
  // }

  // const dateCellRender = (value) => {
  //   if(value.day()==0 ){
  //     return (
  //       <div>

  //         <Tag color='#ef4444'>Holiday</Tag>
  //       </div>
  //     )
  //   }
  // }

  // const disabledDate = (value) => {
  //   const month = value.month();
  //   if(block == 4){
  //     return month>3;
  //   }
  //   if(block == 8){
  //     return (month >=0 && month <=3) || (month >=8 && month <=11);
  //   }
  //   if(block == 3){
  //     return (month >=0 && month <=8);
  //   }
  // }

  return <>
    {/* <Calendar onPanelChange={onPanelChange} onSelect={onSelect}  CellRender={dateCellRender} disabledDate={disabledDate}/>; */}
    <h1>hello</h1>
  </>
};
export default Calendar1;