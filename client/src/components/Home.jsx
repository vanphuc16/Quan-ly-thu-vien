import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { addReviewApi, retrieveReviewsApi } from "../api/endPointsApi";
import {useAuth} from '../security/authContext';

export default function Home() {

    const [description, setDescription] = useState('');
    const [reviews, setReviews] = useState([{}]);
    const [hasReviews, setHasReviews] = useState(false);

    const authContext = useAuth();
    const user_id = authContext.getId();
    const navigate = useNavigate();

    useEffect(()=>{
        authContext.refresh()
        retrieveReviewsApi()
            .then((response)=>{
                setHasReviews(response.data.length > 0)
                setReviews(response.data)
            })
            .catch((error)=>navigate('/error'))
    },[authContext, navigate])

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const addReview = async () => {
        const review = {
            description: description,
            user_id: user_id
        }
        await addReviewApi(review)
            .then((response)=> window.location.href = '/home')
            .catch((error)=> navigate('/error'))
    }

    return (
        <div className="home">
            <div className="container w-50 pt-4">
                <div className="d-flex">
                    <input type="text" className="write-review" value={description} placeholder="Viết 1 điều gì đó" onChange={handleDescriptionChange} />
                    <button className="post-button" onClick={addReview}>Đăng</button>
                </div>
                <hr />
                {hasReviews &&
                    reviews.map((review, index)=>(
                        <div key={index} className="text-start mb-4">
                            <div className="review-header">
                                <h5 className="m-0">{review.name}</h5>
                            </div>
                            <div className="review-body container">
                                <p>{review.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}