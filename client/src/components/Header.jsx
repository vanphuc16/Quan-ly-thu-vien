import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../security/authContext"

export default function Header() {
    const authContext = useAuth();
    const navigate = useNavigate();
    const isAuthenticated = authContext.authenticated();
    const isAdmin = authContext.admin();
    function logout() {
        authContext.logout();
        navigate('/');

    }
    return (
        <header className='border-bottom p-2'>
            <div className='container'>
                <div className='row'>
                    <nav className='navbar navbar-expand-lg'>
                        <p className='navbar-brand ms2 fs-2 fw-bold text-black'>Hệ thống quản lý thư viện</p>
                        <div className='collapse navbar-collapse'>
                            <ul className='navbar-nav'>
                                <li className='nav-item'>
                                    {isAuthenticated && !isAdmin && <Link className='nav-link mx-2' to="/home">Trang chủ</Link>}
                                    {isAuthenticated && isAdmin && <Link className='nav-link mx-2' to="/all-book">Sách</Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && !isAdmin && <Link className='nav-link mx-2' to="/user-books">Sách</Link>}
                                    {isAuthenticated && isAdmin && <Link className='nav-link mx-2' to="/requests">Yêu cầu</Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && !isAdmin && <Link className='nav-link mx-2' to="/bookshelf">Giá sách của tôi</Link>}
                                </li>
                            </ul>
                        </div>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                {isAuthenticated && <Link className='nav-link mx-2' to='/notifications' >Thông báo</Link>}
                            </li>
                            <li className='nav-item'>
                                {!isAuthenticated && <Link className='nav-link mx-2' to='/login' >Đăng nhập</Link>}
                                {isAuthenticated && <Link className='nav-link mx-2' to='/profile' >Thông tin cá nhân</Link>}
                            </li>
                            <li className='nav-item'>
                                {!isAuthenticated && <Link className='nav-link mx-2' to='/signup' >Đăng ký</Link>}
                                {isAuthenticated && <p className='btn nav-link mx-2' onClick={logout}>Đăng xuất</p>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}