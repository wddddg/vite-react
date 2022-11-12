import React, { useState } from "react";
import { Form, Input, Button, message, Spin } from 'antd';
import './index.less'
import LogoImg from '../assets/logo.png'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'

import { register } from '../../request/api'

export default function Register() {


    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true)
        register(values).then(res => {
            if (res?.code == 400) {
                setLoading(false)
                message.error(res.msg, 5);
            } else {
                message.success(res.msg, 5);
                setLoading(false)
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            }
        })
    };
    return (
        <div className="login">
            <div className="login_box">
                <img src={LogoImg} alt="" className="logoImg" />
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                            () => ({
                                validator(_, valuename) {
                                    if (valuename.length >= 3) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('请输入3位以上的用户名!'));
                                },
                            }),
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入6位格式的密码!'
                            },
                            () => ({
                                validator(_, values) {
                                    if (values.length >= 6) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('请输入6位格式的密码!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="passwordtwo"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: '请再次输入相同密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('请再次输入相同密码!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次输入相同密码" size="large" />
                    </Form.Item>

                    <Form.Item
                    >
                        <Link to="/login">已有账号？前往登录</Link>
                    </Form.Item>

                    <Form.Item>
                        <div className="regorlog">
                            <Spin spinning={loading} delay={100}>
                                <Button type="primary" htmlType="submit" className="reg" size="large">
                                    注册
                                </Button>
                            </Spin>
                        </div>
                    </Form.Item>
                </Form >
            </div >
        </div >
    )
}