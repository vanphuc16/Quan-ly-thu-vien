import { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { addOfflineBookApi } from "../api/endPointsApi";

export default function BorrowForm() {
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const {user_id,book_id} = useParams();
    function handleDateChange(event) {
        setDate(event.target.value);
    }
    function borrow() {
        const info = {
            user_id: user_id,
            book_id: book_id,
            start_date: date
        }
        addOfflineBookApi(info)
            .then((response)=>navigate('/user-books'))
            .catch((error)=>{
                console.log(error)
                navigate('/error')})
    }
    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="w-50">
                <h5 className="my-2">Bạn muốn mượn sách khi nào?</h5>
                <hr />
                <input type="date" className="form-control mb-2" value={date} onChange={handleDateChange} />
                <button className="btn btn-primary form-control" onClick={borrow}>Mượn</button>
            </div>
        </div>
    )
}