import React, { useEffect, useState, useRef } from 'react';
import { Avatar, List, Button, message, Switch } from 'antd';
import { queryAllUser, delUser, setAdmin } from '../../request/api'
import DarwerUser from '../../components/DrawerUser'

export default function UserList() {

    const unitRef = useRef()
    let [data, setData] = useState([])
    const [showUserInfo, setShowUserInfo] = useState(null)

    async function queryUsers() {
        await queryAllUser().then(res => {
            setData(res.data)
        })
    }

    useEffect(() => {
        queryUsers()
    }, [localStorage])

    const adminDleUser = async ({ adminId, userId }) => {
        await delUser({ isadmin: adminId, userId }).then(res => {
            if (res.code === 200) {
                message.success(res.msg)
            } else {
                message.error(res.msg)
            }
        })
        queryUsers()
    }

    const adminChange = ({ adminId, userId }) => {
        setAdmin({ isadmin: adminId, userId }).then(res => {
            if (res.code === 200) {
                message.success(res.msg)
            } else {
                message.error(res.msg)
            }
        })
    }

    const showUser = (val) => {
        unitRef.current.childOpenDrawer(true)
        setShowUserInfo(val.id)
    }

    return (
        <div style={{ padding: '10px' }}>
            <List
                itemLayout="horizontal"
                style={{ height: '780px', overflow: 'auto' }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={item.icon === null ? <Avatar style={{ color: '#fff', backgroundColor: '#7265e6' }}>{item.username}</Avatar> : <Avatar src={`http://182.61.138.230:3002/uploads?img=${item.icon}`} />}
                            title={<a href="#" onClick={(e) => { showUser(item), e.preventDefault() }}>{item.username}</a>}
                            description={`已发布过的文章` + item.essayLength + `篇`}
                        />
                        <div style={{ margin: '0px 30px', display: localStorage.getItem('isadmin') === '57' ? 'flex' : 'none' }}>
                            <span style={{ margin: '0px 10px' }}>设置管理员:</span>
                            <Switch defaultChecked={item.isadmin === '57' ? true : false} onChange={() => { adminChange({ adminId: localStorage.getItem('isadmin'), userId: item.id }) }} />
                        </div>
                        <Button style={{ display: localStorage.getItem('isadmin') === '57' ? 'block' : 'none' }} onClick={() => { adminDleUser({ adminId: localStorage.getItem('isadmin'), userId: item.id }) }} >删除用户</Button>
                    </List.Item>
                )}
            />
            <DarwerUser ref={unitRef} showUserInfo={showUserInfo}></DarwerUser>
        </div>
    );
};