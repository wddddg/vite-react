import React, { useState, useEffect } from "react";
// import { Button, PageHeader } from 'antd';
export default function EditComponents() {
    return (
        <div>111</div>
    )
}
// import '@wangeditor/editor/dist/css/style.css'
// import { Editor, Toolbar } from '@wangeditor/editor-for-react'
// export default function EditComponents() {
//     const [editor, setEditor] = useState(null) // 存储 editor 实例
//     const [html, setHtml] = useState('<p>hello</p>') // 编辑器内容

//     // 模拟 ajax 请求，异步设置 html
//     useEffect(() => {
//         setTimeout(() => {
//             setHtml('<p>hello&nbsp;world</p>')
//         }, 1500)
//     }, [])

//     const toolbarConfig = {}
//     const editorConfig = {
//         placeholder: '请输入内容...',
//     }

//     // 及时销毁 editor ，重要！
//     useEffect(() => {
//         return () => {
//             if (editor == null) return
//             editor.destroy()
//             setEditor(null)
//         }
//     }, [editor])

//     return (
//         <div className="site-page-header-ghost-wrapper">
//             <PageHeader
//                 ghost={false}
//                 onBack={() => window.history.back()}
//                 title="Title"
//                 subTitle="This is a subtitle"
//                 extra={[
//                     <Button key="3">Operation</Button>,
//                     <Button key="2">Operation</Button>,
//                     <Button key="1" type="primary">
//                         Primary
//                     </Button>,
//                 ]}
//             >
//             </PageHeader>

//             <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
//                 <Toolbar
//                     editor={editor}
//                     defaultConfig={toolbarConfig}
//                     mode="default"
//                     style={{ borderBottom: '1px solid #ccc' }}
//                 />
//                 <Editor
//                     defaultConfig={editorConfig}
//                     value={html}
//                     onCreated={setEditor}
//                     onChange={editor => setHtml(editor.getHtml())}
//                     mode="default"
//                     style={{ height: '500px', 'overflow-y': 'hidden' }}
//                 />
//             </div>
//             <div style={{ marginTop: '15px' }}>
//                 {html}
//             </div>
//         </div>
//     )
// }
