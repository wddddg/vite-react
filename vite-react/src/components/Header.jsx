
import React, { useEffect, useState } from 'react'
import { Layout, Menu, Avatar, Dropdown, Space, message, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const { Header } = Layout;
import LogoImg from '../pages/assets/logo.png'
import {
    DownOutlined
} from '@ant-design/icons';
import '../App.less'

import { useSelector } from 'react-redux';

function HeaderComponents(props) {

    const navigate = useNavigate()
    const localtion = useLocation()
    const [defaultIcon, setDefaultIcon] = useState('')
    const [defaultName, setDefaultName] = useState('name')



    const clearLocal = () => {
        localStorage.clear();
        message.error('你还没登录，请先登录再访问！', 3)
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }
    useEffect(() => {
        setDefaultName(localStorage.username)
        setDefaultIcon(localStorage.getItem('icon'))
    }, [localtion])

    // subscribe(() => {
    //     console.log(111);
    // })

    // const changeAvatar = () => {
    //     setDefaultIcon('')
    //     setDefaultIcon(`http://localhost:3002/uploads?img=${localStorage.getItem('icon')}`)
    // }

    const downMenu = (
        <Menu
            items={[
                {
                    label: (
                        <a onClick={clearLocal}>
                            退出登录
                        </a>
                    ),
                    key: '1',
                }
            ]}
        />
    )


    return (
        <Header className='headers'>
            <div className='headerFlex'>
                <img src={LogoImg} alt="" className="headerImg" />
                <div className='avatarFlex'>

                    <Dropdown overlay={downMenu}>
                        <a onClick={e => e.preventDefault()} className="hover-down-muen">
                            <Space>
                                <Image preview={false} src={`http://localhost:3002/uploads?img=${defaultIcon}`} style={{ borderRadius: '50%', width: '42px', height: '42px', position: 'relative', top: '13px', margin: '0px 10px', display: defaultIcon === 'null' ? 'none' : 'block' }} />
                                <Avatar style={{ color: '#fff', backgroundColor: '#7265e6', margin: '0px 10px', display: defaultIcon != 'null' ? 'none' : 'block' }} size="large">{defaultName}</Avatar>
                                {defaultName}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
        </Header>
    )
}



export default HeaderComponents
