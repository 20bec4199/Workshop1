import { useState, useEffect } from "react";
import axios from 'axios';
import { Design } from "../../layout/design";
import { Table, message, Tag, Button, Space, Popconfirm } from 'antd';
import moment from 'moment';



export const MyEvents = () => {
    const [workshops, setWorkshops] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/workshop/created/workshops', {
                withCredentials: true
            });
            console.log(response);
            setWorkshops(response.data.workshops);

        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        fetchData();
    }, []);

    const handleDelete = async (record) => {
        console.log(record);
        try {
            const response = await axios.delete(`http://localhost:5000/api/workshop/delete/workshop/${record._id}`, {
                withCredentials: true
            });
            console.log(response);
            if (response.data.success) {
                message.success('Deleted successfully');
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            fetchData();
        }
    }

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
            align: "center"

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
        },

    ];

    return <Design>
        <h1>Worshops</h1>
        <Table dataSource={workshops} columns={columns} rowKey="_id" />
    </Design>
}