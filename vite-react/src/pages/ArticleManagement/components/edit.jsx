import React, { useState, useEffect } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Button, PageHeader, message, Upload, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { addText } from '../../../request/api'

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
                // ['image', 'video'], // 上传图片、上传视频
            ],
        }
    }
}
export default function EditComponents(props) {

    const [fileList, setFileList] = useState([]);
    // const [uploading, setUploading] = useState(false);
    const [content, setContent] = useState();
    const [titleVal, setTitleVal] = useState();

    const upProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };

    const { quill, quillRef } = useQuill(editorOption);

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                // console.log(quill.getText()); // Get text only
                setContent(quill.getText())
                // console.log(quill.getContents()); // Get delta contents
                // console.log(quill.root.innerHTML); // Get innerHTML using quill
                // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
            });
        }
    }, [quill]);

    const SubmitArticles = () => {
        const formData = new FormData();
        formData.append('avatar', fileList[0]);
        formData.append('content', content);
        formData.append('userId', localStorage.getItem('id'));
        formData.append('title', titleVal)
        addText(formData).then((res) => {
            if (res.code === 200) {
                message.success(res.msg)
            } else {
                message.error(res.msg)
            }
        })
    }

    const inputBlur = (vals) => {
        setTitleVal(vals.target.value)
    }

    return props.path === '/article-management/edit' ? (
        <>
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="编辑"
                    subTitle="这是文章编辑"
                    extra={[
                        <Button key="1" type="primary" onClick={SubmitArticles}>
                            提交
                        </Button>,
                    ]}
                    style={{ padding: '10px 20px' }}
                >
                </PageHeader>
                <div style={{ margin: '10px' }}>
                    <Upload {...upProps}>
                        <Button icon={<UploadOutlined />} disabled={fileList.length === 1}>上传封面</Button>
                    </Upload>
                </div>
                <Input placeholder="标题" />;
                <div style={{ width: '100%', height: 300, padding: ' 0px 10px', margin: '10px 0px' }}>
                    <div ref={quillRef} />
                </div>
            </div>
        </>
    ) : (
        <>

            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    title="新建"
                    subTitle="这是新建文章"
                    extra={[
                        <Button key="1" type="primary" onClick={SubmitArticles}>
                            提交
                        </Button>,
                    ]}
                    style={{ padding: '10px 20px' }}
                >
                </PageHeader>
                <div style={{ margin: '10px' }}>
                    <Upload {...upProps}>
                        <Button icon={<UploadOutlined />} disabled={fileList.length === 1}>上传封面</Button>
                    </Upload>
                </div>
                <div style={{ padding: '10px', wdith: '100%' }} >
                    <Input size="large" placeholder="标题" onChange={inputBlur} />
                </div>
                <div style={{ width: '100%', height: 300, padding: ' 0px 10px', margin: '10px 0px' }}>
                    <div ref={quillRef} />
                </div>
            </div>
        </>
    )
}