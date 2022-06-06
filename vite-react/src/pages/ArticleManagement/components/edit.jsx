import React, { useState, useEffect } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Button, PageHeader } from 'antd';



const editorOption = {
    placeholder: '请输入内容...',
    modules: {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
                [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
                [{ list: 'ordered' }, { list: 'bullet' }], // 列表
                [{ indent: '-1' }, { indent: '+1' }], // 缩进
                [{ direction: 'rtl' }], // 文本方向
                [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
                [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
                [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
                [{ font: [] }], // 字体
                [{ align: [] }], // 对齐方式
                ['clean'], // 清除字体样式
                ['image', 'video'], // 上传图片、上传视频
            ],
        }
    }
}
export default function EditComponents() {
    const { quill, quillRef } = useQuill(editorOption);
    useEffect(() => {
        if (quill) {
            // quill.clipboard.dangerouslyPasteHTML('<h1>请输入内容...</h1>');
            console.log(quill);
        }
    }, [quill]);

    return (
        <>
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Title"
                    subTitle="This is a subtitle"
                    extra={[
                        <Button key="3">Operation</Button>,
                        <Button key="2">Operation</Button>,
                        <Button key="1" type="primary">
                            Primary
                        </Button>,
                    ]}
                >
                </PageHeader>
                <div style={{ width: '100%', height: 300 }}>
                    <div ref={quillRef} />
                </div>
            </div>
        </>
    )
}
