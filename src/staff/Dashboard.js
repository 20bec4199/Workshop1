import { useEffect, useState } from "react";
import { Design } from "../layout/design"
import { Row, Col, Card } from 'antd';
import axios from 'axios';
export const StaffDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const User = await axios.get('http://localhost:5000/api/workshop/user', {
                    withCredentials: true
                });
                setUser(User.data.user);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return <Design className='bg-gray-300'>
        <Row style={{ margin: '20px' }}>
            <Col span={10} offset={6} style={{ textAlign: 'center' }}>
                <Card className="bg-white rounded-lg shadow-xl hover:shadow-2xl" >
                    <h1 className="text-sky-900 font-bold">Welcome to WorkshopHub</h1>
                </Card>
            </Col>
        </Row>
        <Row style={{ margin: '20px' }}>
            <Col span={7} offset={1} style={{ textAlign: 'center' }}>
                <Card className="bg-white rounded-lg shadow-xl hover:shadow-2xl">
                    <h1 className="text-sky-900 font-bold">Name </h1> {user ? user.name : null}
                </Card>
            </Col>
            <Col span={7} offset={1} style={{ textAlign: 'center' }}>
                <Card className="bg-white rounded-lg shadow-xl hover:shadow-2xl">
                    <h1 className="text-sky-900 font-bold">Email </h1> {user ? user.email : null}
                </Card>
            </Col>
            <Col span={7} offset={1} style={{ textAlign: 'center' }}>
                <Card className="bg-white rounded-lg shadow-xl hover:shadow-2xl">
                    <h1 className="text-sky-900 font-bold">Campus</h1>  {user ? user.campus : null}
                </Card>
            </Col>
        </Row>
    </Design>
}