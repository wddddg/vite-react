import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from "react";
import Edit from '../pages/ArticleManagement/components/edit'
import { Button, Drawer, Space } from 'antd';
function DrawerComponents(props, ref) {
    const unitRef = useRef(null)
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

    const updataTextConetent = () => {
        unitRef.current.updataTextContent(props.content)
        props.setParent(true)
        setVisible(false)
    }

    return (
        <>
            <Drawer
                title={props.type === 'chak' ? "查看文章" : "编辑文章"}
                placement={placement}
                width={600}
                onClose={childCloseDrawer}
                visible={visible}
                extra={
                    <Space style={{ display: props.type === 'chak' ? "none" : "block" }}>
                        <Button onClick={updataTextConetent}>修改</Button>
                    </Space>
                }
            >
                <Edit ref={unitRef} type={props.type} content={props.content}></Edit>
            </Drawer>
        </>
    );
};
export default forwardRef(DrawerComponents) 