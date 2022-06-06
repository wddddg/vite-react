import React, { useState } from "react";
import { Layout, Image, Button, List, Typography } from 'antd';

const { Sider, Content } = Layout;

import './index.less'

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

export default function UserCenter() {
    const [visible, setVisible] = useState(false);



    return (
        <div className="usercenter">
            <Layout className="usercenter_layout">
                <Sider className="usercenter_sider">
                    <Image
                        preview={{
                            visible: false,
                        }}
                        width={200}
                        src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
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
                            <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
                        </Image.PreviewGroup>
                    </div>
                    <div className="usercenter_sider_action">
                        <Button>修改头像</Button>
                        <Button>修改密码</Button>
                    </div>
                </Sider>
                <Content className="usercenter_content">

                    <List
                        bordered
                        dataSource={data}
                        renderItem={item => (
                            <List.Item actions={[<Button key="list-loadmore-edit">编辑</Button>, <Button key="list-loadmore-more">删除3</Button>]}>
                                <Typography.Text mark>[ITEM]</Typography.Text> {item}
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
        </div>
    )
}