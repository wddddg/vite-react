import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import Edit from '../../ArticleManagement/components/edit'
import { Button, Drawer, Space } from 'antd';
function DrawerComponents(props, ref) {
    const [visible, setVisible] = useState(false);
    const [placement, setPlacement] = useState('right');
    const childOpenDrawer = (val) => {
        setVisible(val);
    };
    const childCloseDrawer = () => {
        setVisible(false);
    };
    useImperativeHandle(ref, () => ({
        childOpenDrawer
    }))
    useEffect(() => {

    }, [props])
    return (
        <>
            <Drawer
                title="查看文章"
                placement={placement}
                width={600}
                onClose={childCloseDrawer}
                visible={visible}
            >
                <Edit type={'chak'} content={props.content}></Edit>
            </Drawer>
        </>
    );
};
export default forwardRef(DrawerComponents) 