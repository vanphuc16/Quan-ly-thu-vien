import { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { updateOfflineReadApi } from "../api/endPointsApi";

export default function AcceptBorrowForm() {
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const {user_id,book_id} = useParams();
    function handleDateChange(event) {
        setDate(event.target.value);
    }
    function acceptBorrow() {
        const info = {
            user_id: user_id,
            book_id: book_id,
            end_date: date
        }
        updateOfflineReadApi(info)
            .then((response)=>navigate('/all-book'))
            .catch((error)=>navigate('/error'))
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="w-50">
                <h5 className="my-2">Chọn thời gian trả</h5>
                <hr />
                <input type="date" className="form-control mb-2" value={date} onChange={handleDateChange} />
                <button className="btn btn-success form-control" onClick={acceptBorrow}>Chấp nhận</button>
            </div>
        </div>
    )
}