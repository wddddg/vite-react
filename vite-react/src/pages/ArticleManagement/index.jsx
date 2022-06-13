import React, { useEffect } from "react";
import EditComponents from './components/edit'
import Management from './components/List'

import { useLocation } from "react-router-dom";
export default function ArticleManagement() {
    let Locations = useLocation()
    return (
        <div>
            <div style={{ display: Locations.pathname === '/article-management/add' || '/article-management/edit' && Locations.pathname != '/article-management/management' ? 'block' : 'none' }}>
                <EditComponents path={Locations.pathname}></EditComponents>
            </div>
            <div style={{ display: Locations.pathname === '/article-management/management' ? 'block' : 'none' }}>
                <Management></Management>
            </div>
        </div>
    )
}