import React, { useEffect, useState } from 'react';
import { Avatar, List, Button, message, Switch } from 'antd';
import { queryAllUser, delUser, setAdmin } from '../../request/api'

export default function UserList() {

    let [data, setData] = useState([])

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

    return (
        <div style={{ padding: '10px' }}>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={item.icon === null ? <Avatar style={{ color: '#fff', backgroundColor: '#7265e6' }}>{item.username}</Avatar> : <Avatar src={`http://localhost:3002/uploads?img=${item.icon}`} />}
                            title={<a href="#">{item.username}</a>}
                            description={`已发布过的文章` + item.essayLength + `篇`}
                        />
                        <div style={{ margin: '0px 30px', display: 'flex' }}>
                            <span style={{ margin: '0px 10px' }}>设置管理员:</span>
                            <Switch defaultChecked={item.isadmin === '57' ? true : false} onChange={() => { adminChange({ adminId: localStorage.getItem('isadmin'), userId: item.id }) }} />
                        </div>
                        <Button style={{ display: localStorage.getItem('isadmin') === '57' ? 'block' : 'none' }} onClick={() => { adminDleUser({ adminId: localStorage.getItem('isadmin'), userId: item.id }) }} >删除用户</Button>
                    </List.Item>
                )}
            />
        </div>
    );
};