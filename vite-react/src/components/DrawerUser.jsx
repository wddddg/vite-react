import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import UserCenter from '../pages/userCenter'
import { Button, Drawer, Space } from 'antd';
import { queryUser } from '../request/api'

function DrawerUserComponents(props, ref) {
    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useState({})
    const childCloseDrawer = () => {
        setVisible(false);
    };
    const childOpenDrawer = (val) => {
        setVisible(val);
    }

    useImperativeHandle(ref, () => ({
        childOpenDrawer
    }))

    useEffect(() => {
        if (props?.showUserInfo) {
            queryUser({ userId: props.showUserInfo }).then(res => {
                let { icon, id, username } = res[0]
                setUserData({ icon, id, username })
            })
        }
    }, [props])

    return (
        <>
            <Drawer
                title={'查看用户'}
                placement={'right'}
                width={600}
                onClose={childCloseDrawer}
                visible={visible}
            >
                <UserCenter userData={userData}></UserCenter>
            </Drawer>
        </>
    );
};
export default forwardRef(DrawerUserComponents)