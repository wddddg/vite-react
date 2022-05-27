import App from '../App'
import Login from '../pages/Login'
import Register from '../pages/Register'
import List from '../pages/List'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import UserList from '../pages/userList'
import UserCenter from '../pages/userCenter'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const BaseRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/list" element={<List />}></Route>
                <Route path="/edit" element={<Edit />}></Route>
                <Route path="/means" element={<Means />}></Route>
                <Route path="/user-list" element={<UserList />}></Route>
                <Route path="/user-center" element={<UserCenter />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </Routes>
    </Router>
)

export default BaseRouter