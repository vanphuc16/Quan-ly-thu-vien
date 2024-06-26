import { useState } from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { deleteBookApi, retrieveAllBookApi } from "../api/endPointsApi";
import {useAuth} from '../security/authContext';

export default function AdminBooks() {
    const [books, setBooks] = useState([{}]);
    const [hasBooks, setHasBooks] = useState(false);

    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        authContext.refresh()
        retrieveAllBookApi('')
            .then((response) => {
                setHasBooks(response.data.length > 0)
                setBooks(response.data)
            })
            .catch((error) => navigate('/error'))
    },[authContext, navigate])

    function handleDelete(id) {
        deleteBookApi(id)
            .then((response) => window.location.href = '/all-book')
            .catch((error) => {
                console.log(error)
                navigate('/error')
            })
    }

    function handleEdit(book) {
        const flag = true;
        navigate('/book-form', {state:{flag, book}})
    }

    function handleAdd() {
        const flag = false;
        navigate('/book-form', {state:{flag}})
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-4">
                <h2>Sách</h2>
                <button className="btn btn-primary" onClick={handleAdd}>Thêm sách mới</button>
            </div>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th>ISBN</th>
                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Nhà xuất bản</th>
                        <th>Năm xuất bản</th>
                        <th>Thể loại</th>
                    </tr>
                </thead>
                <tbody>
                    {hasBooks &&
                        books.map(
                            book => (
                                <tr key={book.book_id}>
                                    <td>{book.isbn}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publisher}</td>
                                    <td>{book.year}</td>
                                    <td>{book.genre}</td>
                                    <button className="btn btn-success px-3 mx-2 mb-2" onClick={() => handleEdit(book)}>Sửa</button>
                                    <button className="btn btn-warning mb-2" onClick={() => handleDelete(book.book_id)}>Xóa</button>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}