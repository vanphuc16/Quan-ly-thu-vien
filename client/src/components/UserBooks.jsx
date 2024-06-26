import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addOnlineBookApi, retrieveAllBookApi } from "../api/endPointsApi";
import { useAuth } from "../security/authContext";

export default function UserBooks() {
    const [books, setBooks] = useState([{}]);
    const [hasBooks, setHasBooks] = useState(false);
    const [search, setSearch] = useState('');
    const authContext = useAuth();
    const navigate = useNavigate();
    const user_id = authContext.getId();

    useEffect(() => {
        authContext.refresh()
        retrieveAllBookApi(search)
            .then((response) => {
                setHasBooks(response.data.length > 0)
                setBooks(response.data)
            })
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    },[authContext, navigate, search])

    function handleSearchChange(event) {
        setSearch(event.target.value)
        retrieveAllBookApi(event.target.value)
            .then((response) => {
                setHasBooks(response.data.length > 0)
                setBooks(response.data)
            })
            .catch((error) => navigate('/error'))
    }

    function handleOnlineRead(book_id) {
        const info = {
            user_id: user_id,
            book_id: book_id
        }
        addOnlineBookApi(info)
            .then((response) => window.location.href = '/bookshelf')
            .catch((error) => navigate('/error'))
    }

    function borrow(book_id) {
        navigate(`/borrow-book/${user_id}/${book_id}`)
    }

    return (
        <div className="books">
            <div className="container pt-4">
                <input type="text" placeholder="Nhập từ khóa tìm kiếm" className="form-control text-center bg-light" value={search} onChange={handleSearchChange} />
                <hr />
                <div className="row g-2">
                    {hasBooks &&
                        books.map(
                            book => (
                                <div className="col-12 col-md-2 m-1" key={book.book_id} style={{ backgroundColor: "#e5e5e5" }}>
                                    <Link to={`/book-details/${book.book_id}`}><img src={book.image_link} alt='Book' className="book--image mt-4"/></Link>
                                    <p>{book.title}</p>
                                    <button className="btn btn-outline-success form-control mb-2" onClick={() => handleOnlineRead(book.book_id)}>Thêm vào giá sách</button>
                                    <button className="btn btn-success form-control mb-2" onClick={()=>borrow(book.book_id)}>Yêu cầu mượn</button>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}