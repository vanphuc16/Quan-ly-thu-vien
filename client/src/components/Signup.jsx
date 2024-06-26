import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import {signupApi} from '../api/endPointsApi';
import { useAuth } from "../security/authContext";

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const authContext = useAuth();

    useEffect(() => {
        authContext.logout()
    }, [authContext])

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function submit() {
        const user = {
            name: name,
            email: email,
            password: password
        }
        await signupApi(user)
            .then((response) => navigate('/success'))
            .catch((error) => navigate('/error'))
    }

    return (
        <div className="d-flex align-items-center justify-content-center signup">
            <div className="w-50 text-start" style={{backgroundColor: "white", padding: "40px", borderRadius: "10px"}}>
                <h2 className="text-center">Đăng ký</h2>
                <label>Tên</label>
                <input type='text' className="form-control" value={name} onChange={handleNameChange} />
                <label>Email</label>
                <input type='email' className="form-control" value={email} onChange={handleEmailChange} />
                <label>Mật khẩu</label>
                <input type='password' className="form-control" value={password} onChange={handlePasswordChange} />
                <button className="btn btn-success form-control mt-4" onClick={submit}>Đăng ký</button>
                <Link className="btn btn-link form-control mt-4" to='/login'>Nếu đã đăng ký rồi, vui lòng đăng nhập</Link>
            </div>
        </div>
    )
}