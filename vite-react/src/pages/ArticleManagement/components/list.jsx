import React, { useEffect, useState, useRef } from "react";
import { Space, Table, Button, Image, Popconfirm, message } from 'antd';
import { delText, queryText } from '../../../request/api'
import { useLocation } from "react-router-dom";
import Drawer from "../../../components/Drawer";
import DarwerUser from '../../../components/DrawerUser'
const text = '确定要删除文章吗?';
export default function Management() {
    let locations = useLocation()
    const columns = [
        {
            title: '用户',
            dataIndex: 'username',
            key: 'username',
            render: (text, record) => <Button type="link" onClick={() => { userInfo(record.userId) }}>{text}</Button>,
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
        },
        {
            title: '文章内容',
            dataIndex: 'content',
            key: 'content',
            ellipsis: true,
        },
        {
            title: '首页图片',
            dataIndex: 'img',
            key: 'img',
            render: (_, record) => (
                <Image
                    width={30}
                    src={`http://182.61.138.230:3002/uploads?img=${record.img}`}
                />
            ),
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" size="small" onClick={() => { childOpenDrawer(record) }} >修改</Button>

                    <Popconfirm
                        placement="bottomRight"
                        title={text}
                        onConfirm={() => { changDleText(record) }}
                        okText="是"
                        cancelText="否"
                    >
                        <Button type="link" size="small">删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const unitRef = useRef(null)
    const unitUserRef = useRef(null)
    const [data, setData] = useState([])
    const [content, setContent] = useState(null)
    const [showUserInfo, setShowUserInfo] = useState(null)


    const childOpenDrawer = (item) => {
        unitRef.current.childOpenDrawer(true)//结果：'父组件调用'
        setContent(item)
    }
    const userInfo = (val) => {
        unitUserRef.current.childOpenDrawer(true)
        setShowUserInfo(val)
    }
    const changDleText = async (item) => {
        await delText({ userId: item.userId, textId: item.id, isadmin: localStorage.getItem('isadmin'), img: item.img })
            .then((res) => {
                message.success(res.msg)
            })
        queryTextFun()
    }
    async function queryTextFun() {
        let resbody = []
        await queryText(localStorage.getItem('id')).then(res => {
            resbody = [...res]
            resbody.map((item) => {
                item.key = item.id
            })
        })
        setData(resbody)
    }
    useEffect(() => {
        queryTextFun()
    }, [locations])

    const bindChild = (val) => {
        if (val) {
            setTimeout(() => {
                queryTextFun()
            }, 1000);
        }
    }

    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={false} style={{ height: '795px', overflow: 'auto' }} />
            <Drawer ref={unitRef} content={content} type='edit' setParent={bindChild.bind(this)} ></Drawer>
            <DarwerUser ref={unitUserRef} showUserInfo={showUserInfo}></DarwerUser>
        </div>
    )
}