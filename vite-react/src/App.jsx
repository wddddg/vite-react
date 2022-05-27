import { useState } from 'react'
import { Layout, Menu, Avatar, Dropdown, Space } from 'antd';
const { Header, Sider, Content } = Layout;
import {
  DesktopOutlined,
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
            修改资料
          </a>
        ),
        key: '0',
      },
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
  const [collapsed, setCollapsed] = useState(false);
  const selectItem = (e) => {
    console.log('click ', e);
  };

  const items = [
    getItem('列表信息', '1', <PieChartOutlined />),
    getItem('文档管理', 'sub1', <UserOutlined />, [
      getItem('新建文档', '3'),
      getItem('编辑文档', '4'),
      getItem('删除文档', '5'),
    ]),
    getItem('用户管理', 'sub2', <TeamOutlined />),
    getItem('个人中心', '9', <FileOutlined />),
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
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
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
            <Breadcrumb></Breadcrumb>
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
