import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
const { Sider } = Layout;
import {
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';


export default function SiderComponents() {


    const localtion = useLocation()
    const navigate = useNavigate()

    const [collapsed, setCollapsed] = useState(false);
    const [defaultKey, setDefaultKey] = useState('/list')

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem('列表信息', '/list', <PieChartOutlined />),
        getItem('文章管理', '/article-management', <FileOutlined />, [
            getItem('新建文章', '/article-management/add'),
            getItem('用户文章列表管理', '/article-management/management'),
        ]),
        getItem('用户管理', '/user-list', <TeamOutlined />),
        getItem('个人中心', '/user-center', <UserOutlined />),
    ];
    const selectItem = (e) => {
        navigate(e.key)
        setDefaultKey(e.key)
    };
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        setDefaultKey(localtion.pathname)
    }, [location])

    return (
        <>
            <Sider className='siders' collapsible onCollapse={toggleCollapsed} collapsed={collapsed}>
                <div className='title'>
                    wddxhz.xyz
                </div>
                <Menu
                    onClick={selectItem}
                    selectedKeys={[defaultKey]}
                    defaultOpenKeys={['/article-management']}
                    mode="inline"
                    items={items}
                    theme="dark"
                />
            </Sider>
        </>
    )
}