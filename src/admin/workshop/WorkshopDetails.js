import { useEffect, useState } from "react";
import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import { Design } from '../../layout/design';
import { Table, Spin, Alert, Space, Button, Popconfirm, Breadcrumb, message, Form, Radio, Modal, Select, Option } from 'antd';
import moment from 'moment';
import Title from "antd/es/skeleton/Title";



const WorkshopDetails = ({ selectedCampus, setSelectedCampus }) => {
    const [workshop, setWorkshop] = useState([]);
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState(false);
    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [form] = Form.useForm();
    const [update, setUpdate] = useState(null);





    const fetchWorkshops = async () => {
        try {
            const Workshops = await axios.get(`http://localhost:5000/api/workshop/get/workshops/${selectedCampus}`, {
                withCredentials: true
            });
            if (!Workshops) {

            }
            console.log(Workshops.data.workshops);
            setWorkshops(Workshops.data.workshops);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        fetchWorkshops();
    }, [selectedCampus]);


    const fetchUsers = async (record) => {
        try {
            const Users = await axios.get(`http://localhost:5000/api/workshop/get/workshop/registeredusers/${record._id}`, {
                withCredentials: true
            });
            console.log("users");
            console.log(Users);
            setWorkshop(record.title);
            if (Users.data.success) {
                setUsers(Users.data.userDetail);
                // setStatus(Users.data.userDetail);
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    const handleView = (record) => {
        fetchUsers(record);
        setWorkshop(record.title);
        setView(true);
    }

    const getStatusColor = (status) => {
        if (status === 'Pending') {
            return 'bg-sky-500';
        }
        else if (status === 'Certified') {
            return 'bg-green-500';
        }
        else if (status === 'Not-Attended') {
            return 'bg-red-500';
        }
    }






    const columns1 = [
        {
            title: 'S.No',
            align: 'center',
            render: (text, record, index) => <div style={{ textAlign: "center" }}>{index + 1}</div>,
            width: '80px'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',

        },
        {
            title: 'Workshop',
            key: 'title',
            dataIndex: 'workshop',

            align: 'center'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status, record) => (
                <Button className={`${getStatusColor(status)} hover:translate-y-1`} onClick={() => showModal(record)}>
                    {status}
                </Button>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            align: "center",
            width: '150px',
            render: (text, record) => (
                <Space size='middle'>

                    <Popconfirm
                        title="Are you sure to delete this record?"
                        // onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>Delete</Button>
                    </Popconfirm>
                </Space>
            )

        }
    ]

    const columns = [
        {
            title: "Serial No",
            align: "center",
            render: (text, record, index) => <div style={{ textAlign: "center" }}>{index + 1}</div>,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            align: "center",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",

        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            align: "center",
            render: (text) => (moment(text).format('YYYY-MM-DD'))
        },
        {
            title: "Actions",
            key: "actions",
            align: "center",
            width: '150px',
            render: (text, record) => (
                <Space size='middle'>
                    <Button type="primary" onClick={() => handleView(record)} >View</Button>
                    <Popconfirm
                        title="Are you sure to delete this record?"
                        onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    const handleDelete = async (record) => {
        console.log(record);
        try {
            const deleteResponse = await axios.delete(`http://localhost:5000/api/workshop/delete/workshop/${record._id}`, {
                withCredentials: true
            });
            fetchWorkshops();
            if (deleteResponse.data.success) {
                message.success('Workshop deleted Successfully!');
            }
        }
        catch (error) {
            console.log(error);
        }
    }



    const handleBack = () => {
        setSelectedCampus(null);
        setView(false);
    }
    const handleBack1 = () => {
        setView(false);
    }

    const showModal = (record) => {
        setSelectedRecord(record);
        console.log(selectedRecord);
        console.log(record.status);
        setUpdate(record.registerId);
        form.setFieldsValue({
            status: record.status
        })
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = async () => {
        try {
            const value = await form.validateFields();
            let status = value.status
            const updateResponse = await axios.put(`http://localhost:5000/api/workshop/update/workshop/status/${update}`, { status }, {
                withCredentials: true
            });
            console.log(updateResponse);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsModalVisible(false);
            console.log('finally');
            console.log(selectedRecord);
            fetchUsers(selectedRecord);
        }
    }




    if (loading) return <Spin tip="Loading..." />;
    return (
        <>






            {view ? <div>
                <Breadcrumb className='mb-5 hover:cursor-pointer'>
                    <Breadcrumb.Item onClick={handleBack}>{selectedCampus}</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={handleBack1}>Workshops</Breadcrumb.Item>
                    <Breadcrumb.Item>RegisteredUsers</Breadcrumb.Item>

                </Breadcrumb>

                <Table dataSource={users} columns={columns1} rowKey="_id" />


            </div> :
                <div>
                    <Breadcrumb className="mb-5">
                        <Breadcrumb.Item onClick={handleBack} className='hover:cursor-pointer'>{selectedCampus}</Breadcrumb.Item>
                        <Breadcrumb.Item>Workshops</Breadcrumb.Item>
                    </Breadcrumb>

                    <Table dataSource={workshops} columns={columns} rowKey="_id" />

                </div>
            }

            <Modal
                title="Update Status"
                open={isModalVisible}
                onCancel={handleCancel}
                onOk={handleOk}
            >

                <Form form={form} layout="vertical">
                    <Form.Item label="Workshop Status" name="status" rules={[{ required: true, message: "please select the status" }]}>
                        <Radio.Group >
                            <Radio value="Registered">Registered</Radio>
                            <Radio value="Not-Attended">Not-Attended</Radio>
                            <Radio value="Certified">Certified</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>



        </>
    );
}

export default WorkshopDetails;