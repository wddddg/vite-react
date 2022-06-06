import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from 'antd';
import './index.less'
import LogoImg from '../assets/logo.png'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../request/api';
import { Link, useNavigate } from 'react-router-dom'
import { connect, useDispatch } from "react-redux";

function Login(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    let num = 1
    useEffect(() => {
        if (props?.error?.length && num) {
            message.error(props.error, 3)
            dispatch({
                type: '/login',
                payload: {
                    error: ''
                }
            })
            num = 0
        }
    }, [props])

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true)
        login(values).then(res => {
            if (res?.code == 400) {
                message.error(res.msg, 5);
                setLoading(false)
            } else {
                message.success(res.msg, 5);
                setLoading(false)
                localStorage.setItem('username', res.data.username)
                localStorage.setItem('password', res.data.password)
                localStorage.setItem('icon', res.data.icon)
                localStorage.setItem('isadmin', res.data.isadmin)

                setTimeout(() => {
                    navigate('/')
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
                            <Spin spinning={loading} delay={1}>
                                <Button type="primary" htmlType="submit" className="login" size="large">
                                    登录
                                </Button>
                            </Spin>
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

const mapStateToProps = (state) => {
    return {
        error: state.error
    }
}

export default connect(mapStateToProps)(Login)