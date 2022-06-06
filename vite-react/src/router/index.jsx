import App from '../App'
import Login from '../pages/Login'
import Register from '../pages/Register'
import List from '../pages/List'
import ArticleManagement from '../pages/ArticleManagement'
import Edit from '../pages/ArticleManagement/components/edit'
import Management from '../pages/ArticleManagement/components/list'
import UserList from '../pages/userList'
import UserCenter from '../pages/userCenter'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const BaseRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/list" element={<List />}></Route>
                <Route path="/article-management" element={<ArticleManagement />}>
                    <Route path="/article-management/add" element={<Edit />}></Route>
                    <Route path="/article-management/management" element={<Management />}></Route>
                </Route>
                <Route path="/user-list" element={<UserList />}></Route>
                <Route path="/user-center" element={<UserCenter />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </Routes>
    </Router>
)

export default BaseRouter