import React, { useEffect, useState } from 'react'
import { Layout, Menu, Avatar, Dropdown, Space, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
import {
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  DownOutlined
} from '@ant-design/icons';
import "./index.css";
import './App.less'
import { Outlet } from 'react-router-dom'
import LogoImg from './pages/assets/logo.png'
import Breadcrumb from './components/Breadcrumb'
import { useDispatch } from 'react-redux';


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const downMenu = (
  <Menu
    items={[
      {
        label: (
          <a >
            退出登录
          </a>
        ),
        key: '1',
      }
    ]}
  />
);

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const localtion = useLocation()
  const [collapsed, setCollapsed] = useState(false);
  const [defaultKey, setDefaultKey] = useState('/list')

  const selectItem = (e) => {
    navigate(e.key)
    setDefaultKey(e.key)
  };

  useEffect(() => {
    setDefaultKey(localtion.pathname)
  }, [localtion])


  useEffect(() => {
    if (!localStorage.length) {
      navigate('/login')
      dispatch({
        type: '/login',
        payload: {
          error: '你还没登录，请先登录再访问！'
        }
      })
    }
  })

  const items = [
    getItem('列表信息', '/list', <PieChartOutlined />),
    getItem('文章管理', '/article-management', <FileOutlined />, [
      getItem('新建文章', '/article-management/add'),
      getItem('用户文章列表', '/article-management/management'),
    ]),
    getItem('用户管理', '/user-list', <TeamOutlined />),
    getItem('个人中心', '/user-center', <UserOutlined />),
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className='box'>
      <Layout className='layouts'>
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

        <Layout>
          <Header className='headers'>
            <div className='headerFlex'>
              <img src={LogoImg} alt="" className="headerImg" />
              <div className='avatarFlex'>

                <Dropdown overlay={downMenu}>
                  <a onClick={e => e.preventDefault()} className="hover-down-muen">
                    <Space>
                      <Avatar style={{ color: '#fff', backgroundColor: '#7265e6', margin: '0px 10px' }} size="large">U</Avatar>
                      name
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </Header>
          <div className='breadcrumbCss'>
            <Breadcrumb pathnames={localtion}></Breadcrumb>
          </div>
          <Content>
            <div className='content-test'>
              <div style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                <Outlet></Outlet>
              </div>
            </div>
          </Content>
        </Layout>

      </Layout>
    </div>

  )
}

export default App
