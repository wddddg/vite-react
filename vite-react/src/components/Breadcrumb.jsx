import { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';

const routes = [
    {
        path: '/list',
        breadcrumbName: '列表信息',
    },
    {
        path: '/article-management',
        breadcrumbName: '文章管理',
        children: [
            {
                path: '/article-management/add',
                breadcrumbName: '新建文章',
            },
            {
                path: '/article-management/edit',
                breadcrumbName: '编辑文章',
            },
            {
                path: '/article-management/management',
                breadcrumbName: '用户文章列表',
            }
        ]
    },
    {
        path: '/user-list',
        breadcrumbName: '用户管理'
    },
    {
        path: '/user-center',
        breadcrumbName: '个人中心'
    }
];
let parent = {}
export default function BreadcrumbComponents({ pathnames }) {
    const [names, setNames] = useState()
    useEffect(() => {
        routes.map(item => {
            if (item.children) {
                item.children.map(items => {
                    if (items.path === pathnames.pathname) {
                        parent = item
                        return setNames(items.breadcrumbName)
                    } else {
                        return false
                    }
                })
            } else {
                if (item.path === pathnames.pathname) {
                    parent = {}
                    return setNames(item.breadcrumbName)
                } else {
                    return false
                }
            }
        })
    }, [pathnames])

    return parent.path ? (
        <Breadcrumb>
            <Breadcrumb.Item href="/">
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href={parent.children[0].path}>
                <span>{parent.breadcrumbName}</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span>{names}</span>
            </Breadcrumb.Item>
        </Breadcrumb>
    ) : (
        <Breadcrumb>
            <Breadcrumb.Item href="/">
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span>{names}</span>
            </Breadcrumb.Item>
        </Breadcrumb>
    )
};