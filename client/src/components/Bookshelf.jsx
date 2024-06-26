import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeOnlineBookApi, retrieveMyBooksApi } from "../api/endPointsApi";
import { useAuth } from "../security/authContext";

export default function Bookshelf() {
    const [books, setBooks] = useState([{}]);
    const [hasBooks, setHasBooks] = useState(false);
    const authContext = useAuth();
    const navigate = useNavigate();
    const user_id = authContext.getId();

    useEffect(() => {
        authContext.refresh()
        retrieveMyBooksApi(user_id)
            .then((response) => {
                setHasBooks(response.data.length > 0)
                setBooks(response.data)
            })
            .catch((error) => navigate('/error'))
    },[authContext, navigate, user_id])

    function handleRemove(book_id) {
        removeOnlineBookApi(user_id, book_id)
            .then((response) => window.location.href = '/bookshelf')
            .catch((error) => navigate('/error'))
    }
    function borrow(book_id) {
        navigate(`/borrow-book/${user_id}/${book_id}`)
    }

    return (
        <div className="my-books">
            <div className="container pt-4">
                <h2 className="text-start" style={{color: "white"}}>Giá sách của tôi</h2>
                <hr style={{color: "white"}}/>
                <div className="row">
                    {hasBooks &&
                        books.map(
                            book => (
                                <div className="col-12 col-md-2 m-1" key={book.book_id} style={{ backgroundColor: "#e5e5e5" }}>
                                    <Link to={`/book-details/${book.book_id}`}><img src={book.image_link} alt='Book' className="book--image mt-4"/></Link>
                                    <p>{book.title}</p>
                                    <button className="btn btn-outline-success form-control mb-2" onClick={() => handleRemove(book.book_id)}>Xóa</button>
                                    <button className="btn btn-success form-control mb-2" onClick={() => borrow(book.book_id)}>Yêu cầu mượn</button>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}