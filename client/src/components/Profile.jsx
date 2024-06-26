import { useState } from "react"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { deletePreferenceApi, deleteReviewApi, retrievePreferencesApi, retrieveUserApi, retrieveUserReviewsApi } from "../api/endPointsApi"
import { useAuth } from "../security/authContext";

export default function Profile() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [hasPreferences, setHasPreferences] = useState(false);
    const [preferences, setPreferences] = useState([{}]);
    const [reviews, setReviews] = useState([{}]);
    const [hasReviews, setHasReviews] = useState(false);

    const navigate = useNavigate();
    const authContext = useAuth();
    const id = authContext.getId();
    const isAdmin = authContext.admin();

    useEffect(()=>{
        authContext.refresh();

        retrieveUserApi(id)
            .then((response) => {
                setName(response.data.name)
                setEmail(response.data.email)
            })
            .catch((error)=>navigate('/error'))

        retrievePreferencesApi(id)
            .then((response) => {
                setHasPreferences(response.data.length > 0)
                setPreferences(response.data)
            })
            .catch((error)=>navigate('/error'))

        retrieveUserReviewsApi(id)
            .then((response)=>{
                setHasReviews(response.data.length > 0)
                setReviews(response.data)
            })
            .catch((error)=>navigate('/error'))

    },[authContext, navigate, id])

    function handleDelete(title) {
        deletePreferenceApi(id, title)
            .then((response) => window.location.href = '/profile')
            .catch((error)=>navigate('/error'))
    }

    const deleteReview = async (review_id) => {
        await deleteReviewApi(review_id)
            .then((response)=>window.location.href = '/profile')
            .catch((error)=>navigate('/error'))
    }

    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="w-50 text-start">
                <h5 className="m-2">Thông tin cá nhân</h5>
                <hr />
                <h5 className="m-2">Tên</h5>
                <div className="form-control border-0 bg-light">{name}</div>
                <h5 className="m-2">Email</h5>
                <div className="form-control border-0 bg-light">{email}</div>
                {hasPreferences && !isAdmin &&
                    <div>
                        <h5 className="mt-4">Thể loại yêu thích</h5>
                        <hr />
                            {preferences.map(
                                (preference, key) => (
                                    <div className="d-flex justify-content-between form-control mb-2" key={key}>
                                        <p className="m-0">{preference.preference}</p>
                                        <span className="btn p-0 mx-2" onClick={() => handleDelete(preference.preference)}>&times;</span>
                                    </div>
                                )
                            )
                            }
                    </div>
                }
                <hr />
                <div>
                    <Link to={`/update-profile/${id}`}><button className="btn btn-primary form-control">Chỉnh sửa thông tin</button></Link>
                    {!isAdmin && <Link to={`/add-preference/${id}`}><button className="btn btn-info form-control mt-2">Thêm thể loại yêu thích</button></Link>}
                </div>
                {hasReviews && <hr />}
                {hasReviews &&
                    reviews.map((review, index)=>(
                        <div key={index} className="text-start mb-4">
                            <div className="review-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="m-0">{review.name}</h5>
                                    <button className="btn btn-outline-danger" onClick={() => deleteReview(review.review_id)}>Xóa</button>
                                </div>
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