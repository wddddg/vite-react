import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import './index.less'
import LogoImg from '../assets/logo.png'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getLists } from '../../request/api';
import { Link } from 'react-router-dom'

export default function Login() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // const goRegister = () => {
    //     // console.log(data);
    //     // getLists().then(res => {
    //     //     console.log(res);
    //     // })
    //     console.log(history);
    // };

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
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" size="large" />
                    </Form.Item>

                    <Form.Item>
                        <div className="regorlog">
                            <Button type="primary" htmlType="submit" className="login" size="large">
                                登录
                            </Button>
                            <Button type="defalut" className="reg" size="large" >
                                <Link to="/register">注册</Link>
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}