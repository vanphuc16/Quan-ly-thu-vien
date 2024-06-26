import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { addPreferenceApi } from "../api/endPointsApi";


export default function AddPreference() {
    const [name, setName] = useState('');
    const {id} = useParams();

    const navigate = useNavigate();

    function handleNameChange(event) {
        setName(event.target.value);
    }

    async function submit() {
        const preference = {
            user_id: id,
            preference: name
        }
        await addPreferenceApi(preference)
            .then((response) => window.location.href = '/profile')
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="w-50 text-start">
                <h5 className="m-2">Thêm thể loại yêu thích</h5>
                <hr />
                <label>Tên thể loại yêu thích</label>
                <input type='text' className="form-control" value={name} onChange={handleNameChange} />
                <button className="btn btn-info form-control mt-4" onClick={submit}>Thêm</button>
            </div>
        </div>
    )
}