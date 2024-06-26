import { useEffect } from "react";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { retrieveUserApi, updateUserApi } from "../api/endPointsApi";
import { useAuth } from "../security/authContext";


export default function EditProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const {id} = useParams();

    const navigate = useNavigate();
    const authContext = useAuth();

    useEffect(()=>{
        authContext.refresh();
        retrieveUserApi(id)
            .then((response)=>{
                setName(response.data.name)
                setEmail(response.data.email)
            })
            .catch((error)=> navigate('/error'))
    },[authContext, id, navigate])

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    async function submit() {
        const user = {
            id: id,
            name: name,
            email: email,
        }
        await updateUserApi(user)
            .then((response) => window.location.href = '/profile')
            .catch((error) => navigate('/error'))
    }

    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="w-50 text-start">
                <h5 className="m-2">Chỉnh sửa thông tin</h5>
                <hr />
                <label>Tên</label>
                <input type='text' className="form-control" value={name} onChange={handleNameChange} />
                <label>Email</label>
                <input type='email' className="form-control" value={email} onChange={handleEmailChange} />
                <button className="btn btn-success form-control mt-4" onClick={submit}>Cập nhật</button>
            </div>
        </div>
    )
}