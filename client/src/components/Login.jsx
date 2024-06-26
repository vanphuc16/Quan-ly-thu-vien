import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../api/endPointsApi";
import { useAuth } from "../security/authContext";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const authContext = useAuth();

    useEffect(() => {
        authContext.logout()
    }, [authContext])

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function submit() {
        const user = {
            email: email,
            password: password
        }
        await loginApi(user)
            .then((response) => {
                authContext.login(response, email);
                if (authContext.admin()) {
                    navigate('/all-book');
                } else {
                    navigate('/home');
                }
            })
            .catch((error) => navigate('/error'))
    }

    return (
    <div className="d-flex align-items-center justify-content-center login">
        <div className="w-50 text-start" style={{backgroundColor: "white", padding: "40px", borderRadius: "10px"}}>
            <h2 className="text-center">Đăng nhập</h2>
            <label>Email</label>
            <input type='email' className="form-control" value={email} onChange={handleEmailChange} />
            <label>Mật khẩu</label>
            <input type='password' className="form-control" value={password} onChange={handlePasswordChange} />
            <button className="btn btn-primary form-control mt-4" onClick={submit}>Đăng nhập</button>
            <Link className="btn btn-link form-control mt-4" to='/signup'>Nếu bạn chưa đăng ký? Click vào đây</Link>
        </div>
    </div>
    )
}