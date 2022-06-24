import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Button, PageHeader, message, Upload, Input, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { addText, updataText } from '../../../request/api'

function EditComponents(props, ref) {
    const editorOption = {
        readOnly: false,
        theme: 'snow',
        debug: 'warn',
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
    const [fileList, setFileList] = useState([]);
    const [content, setContent] = useState();
    const [contentHTML, setContentHTML] = useState();
    const [titleVal, setTitleVal] = useState();
    const [iptValue, setIptValue] = useState('');
    const [imgShow, setImgShow] = useState(true);

    let quill = null

    useEffect(() => {
        if (document.querySelector('#quill-editors')) {
            quill = new Quill('#quill-editors', editorOption)
        }
        let editors = document.querySelectorAll('.ql-toolbar.ql-snow')
        if (editors.length === 2) {
            editors[0].style.display = 'none'
        }
    }, [])

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

    useImperativeHandle(ref, () => ({
        updataTextContent
    }))

    const updataTextContent = (item) => {
        const formData = new FormData();
        formData.append('avatar', fileList[0]);
        formData.append('img', item.img);
        formData.append('userId', item.userId);
        formData.append('content', content);
        formData.append('title', titleVal)
        formData.append('contentHTML', contentHTML)
        formData.append('textId', item.id)
        updataText(formData).then((res) => {
            if (res.code === 200) {
                message.success(res.msg)
            } else {
                message.error(res.msg)
            }
        })
    }

    useEffect(() => {
        setFileList([]);
        setImgShow(true)
    }, [props])

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                setContent(quill.getText())
                setContentHTML(quill.root.innerHTML);
            });
        }
        if (props.content && document.querySelector('.ql-editor')) {
            setIptValue(props?.content?.title)
            document.querySelector('.ql-editor').innerHTML = props.content.contentHTML
        }
    }, [props, quill]);

    const SubmitArticles = () => {
        const formData = new FormData();
        formData.append('avatar', fileList[0]);
        formData.append('content', content);
        formData.append('userId', localStorage.getItem('id'));
        formData.append('title', titleVal)
        formData.append('username', localStorage.getItem('username'))
        formData.append('contentHTML', contentHTML)
        addText(formData).then((res) => {
            if (res.code === 200) {
                message.success(res.msg)
                setFileList([])
                setIptValue('')
                document.querySelector('.ql-editor').innerHTML = ''
            } else {
                message.error(res.msg)
            }
        })
    }

    const inputBlur = (vals) => {
        setIptValue(vals.target.value)
        setTitleVal(vals.target.value)
    }

    return (
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
                style={{ padding: '10px 20px', display: props?.type === 'chak' || props.type === 'edit' && props.type ? 'none' : 'block' }}
            >
            </PageHeader>
            <div style={{ margin: '10px', display: props?.type === 'chak' && props.type ? 'none' : 'block' }}>
                <Upload {...upProps}>
                    <Button icon={<UploadOutlined />} disabled={fileList.length === 1}>{props.type != 'edit' ? '上传封面' : '修改封面'}</Button>
                </Upload>
            </div>
            <div style={{ padding: '10px', display: props.type === 'chak' || props.type === 'edit' && props.type && imgShow ? 'block' : 'none' }}>
                <Image
                    width={200}
                    src={`http://182.61.138.230:3002/uploads?img=${props?.content?.img}`}
                />
            </div>
            <div style={{ padding: '10px', wdith: '100%' }} >
                <Input size="large" placeholder="标题" onChange={inputBlur} value={iptValue} />
            </div>
            <div style={{ width: '100%', height: 300, padding: ' 0px 10px', margin: '10px 0px' }}>
                <div id={'quill-editors'}></div>
            </div>
        </div>
    )
}


export default forwardRef(EditComponents)