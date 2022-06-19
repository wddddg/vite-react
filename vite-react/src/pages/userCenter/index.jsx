import React, { useEffect, useState, useRef } from "react";
import { Layout, Image, Button, List, Upload, message, Modal, Input } from 'antd';

const { Sider, Content } = Layout;

import { uploadsAvatar, updataAdminPassword, queryText } from '../../request/api'
import { useNavigate } from 'react-router-dom';
import Drawer from "../../components/Drawer";
import './index.less'

function UserCenter() {
    const navigate = useNavigate()
    const unitRef = useRef(null)
    const [visible, setVisible] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [updataAvatar, setUpdataAvatar] = useState(localStorage.getItem('icon'));
    const [nvPassword, setNvPassword] = useState('')
    const [olPassword, setOlPassword] = useState('')
    const [nvIptState, setNvIptState] = useState('')
    const [olIptState, setOlIptState] = useState('')
    const [data, setData] = useState([])
    const [content, setContent] = useState(null)

    const handleOk = () => {
        if (olPassword != '' && nvPassword != '') {
            updataAdminPassword({
                userId: localStorage.getItem('id'),
                newPassword: nvPassword,
                oldPassword: olPassword
            }).then(res => {
                if (res.code === 200) {
                    setIsModalVisible(false);
                    message.success(res.msg + '，返回登录页面重新登录', 2)
                    setTimeout(() => {
                        navigate('/login')
                        localStorage.clear()
                    }, 1000)
                } else {
                    setOlIptState('error')
                    message.error(res.msg)
                }
            })
        } else {
            message.error('请输入正确的密码格式')
            if (olPassword === '') {
                setNvIptState('')
                setOlIptState('error')
            } else {
                setOlIptState('')
                setNvIptState('error')
            }
        }
    };

    const handleCancel = () => {
        message.info('您取消了修改')
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const oldPassword = (val) => {
        setOlPassword(val.target.value)
    }
    const newPassword = (val) => {
        setNvPassword(val.target.value)
    }

    const upProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            setImgShow(false)
            return false;
        },
        fileList,
    };

    const uploadAvatar = () => {
        const formData = new FormData();
        formData.append('avatar', fileList[0]);
        formData.append('icons', localStorage.getItem('icon'));
        formData.append('userId', localStorage.getItem('id'));
        uploadsAvatar(formData).then(res => {
            if (res.code === 200) {
                setUpdataAvatar('')
                localStorage.setItem('username', res.data[0].username)
                localStorage.setItem('password', res.data[0].password)
                localStorage.setItem('icon', res.data[0].icon)
                localStorage.setItem('isadmin', res.data[0].isadmin)
                localStorage.setItem('id', res.data[0].id)
            }
            message.success(res.msg)
            setFileList([])
        })
        window.location.reload()
    }

    const childOpenDrawer = (item) => {
        unitRef.current.childOpenDrawer(true)//结果：'父组件调用'
        setContent(item)
    }

    useEffect(() => {
        setUpdataAvatar(`http://localhost:3002/uploads?img=${localStorage.getItem('icon')}`)
    }, [localStorage.getItem('icon')])

    useEffect(() => {
        async function queryTextAwait() {
            let resData = []
            await queryText(localStorage.getItem('id')).then((res) => {
                resData = [...res]
            })
            setData(resData)
        }
        queryTextAwait()
    })

    return (
        <div className="usercenter">
            <Modal title="修改密码" visible={isModalVisible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
                <Input.Password placeholder="请输入旧的密码" status={olIptState} onChange={oldPassword} />
                <div style={{ margin: '20px 0px' }}></div>
                <Input.Password placeholder="请输入新的密码" status={nvIptState} onChange={newPassword} />
            </Modal>
            <Layout className="usercenter_layout">
                <Sider className="usercenter_sider">
                    <Image
                        preview={{
                            visible: false,
                        }}
                        width={200}
                        src={updataAvatar}
                        onClick={() => setVisible(true)}
                    />
                    <div
                        style={{
                            display: 'none',
                        }}
                    >
                        <Image.PreviewGroup
                            preview={{
                                visible,
                                onVisibleChange: (vis) => setVisible(vis),
                            }}
                        >
                            <Image src={updataAvatar} />
                        </Image.PreviewGroup>
                    </div>
                    <div className="usercenter_sider_action">
                        <Upload {...upProps} showUploadList={false} onChange={uploadAvatar}>
                            <Button>修改头像</Button>
                        </Upload>
                        <Button onClick={showModal}>修改密码</Button>
                    </div>
                </Sider>
                <Content className="usercenter_content">
                    <div style={{ margin: '10px 0px 15px' }}>文章展示：</div>
                    <List
                        bordered
                        size="small"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Button type="link" onClick={() => { childOpenDrawer(item) }}>{item.title}</Button>
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
            <Drawer ref={unitRef} content={content} type='chak'></Drawer>
        </div>
    )
}

export default UserCenter