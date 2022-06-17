import React, { useEffect, useState, useRef } from "react";
import { Space, Table, Button, Image } from 'antd';
import { queryText } from '../../request/api'
import Drawer from "../../components/Drawer";
import { useLocation } from "react-router-dom";
export default function List() {
    let locations = useLocation()
    const columns = [
        {
            title: '用户',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <a>{text}</a>,
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
                    src={`http://localhost:3002/uploads?img=${record.img}`}
                />
            ),
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => { childOpenDrawer(record) }} >查看</Button>
                </Space>
            ),
        },
    ];
    const unitRef = useRef(null)
    const [data, setData] = useState([])
    const [content, setContent] = useState(null)
    const childOpenDrawer = (item) => {
        unitRef.current.childOpenDrawer(true)//结果：'父组件调用'
        setContent(item)
    }
    useEffect(() => {
        async function data() {
            let resbody = []
            await queryText().then(res => {
                resbody = [...res]
                resbody.map((item) => {
                    item.key = item.id
                })
            })
            setData(resbody)
        }
        data()
    }, [locations])

    return (
        <div>
            <Table columns={columns} dataSource={data} />
            <Drawer ref={unitRef} content={content} type='chak'></Drawer>
        </div>
    )
}