import React, { useState } from "react";
import { Layout, Affix } from "antd";
import SiderBar from "./SiderBar";
import HeaderBar from "./HeaderBar";

const { Content } = Layout;

export const Design = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState([1])
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout>
            <Affix offsetTop={0} >
                {/* <SiderBar selected={selected} setSelected={setSelected} collapsed={collapsed} onCollapse={toggleCollapsed} /> */}
                <SiderBar selected={selected} setSelected={setSelected} collapsed={collapsed} onCollapse={toggleCollapsed} />
            </Affix>
            <Layout>
                <Affix offsetTop={0} >
                    <HeaderBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                </Affix>
                <Content style={{ margin: '20px' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

