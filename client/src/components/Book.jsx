import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { retrieveBookApi } from "../api/endPointsApi";
import { useAuth } from "../security/authContext";

export default function Book() {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [pdf, setPdf] = useState('');
    const [image, setImage] = useState('');
    const [genre, setGenre] = useState('');

    const {id} = useParams();
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        authContext.refresh()
        retrieveBookApi(id)
        .then((response) => {
            setTitle(response.data.title)
            setAuthor(response.data.author)
            setPublisher(response.data.publisher)
            setDescription(response.data.description)
            setYear(response.data.year)
            setPdf(response.data.pdf_link)
            setImage(response.data.image_link)
            setGenre(response.data.genre)
        })
        .catch((error) => navigate('/error'))
    },[authContext, id, navigate])

    return (
        <div className="container mt-4">
            <div className="row text-start">
                <div className="col-md-4">
                    <img src={image} alt="Book" />
                    <h5>Tiêu đề</h5>
                    <p>{title}</p>
                    <h5>Tác giả</h5>
                    <p>{author}</p>
                    <h5>Nhà xuất bản</h5>
                    <p>{publisher}</p>
                </div>
                <div className="col-md-8">
                    <h5>Mô tả</h5>
                    <p>{description}</p>
                    <h5>Năm xuất bản</h5>
                    <p>{year}</p>
                    <h5>Thể loại</h5>
                    <p>{genre}</p>
                    <a href={pdf}><button className="btn btn-primary">Đọc bằng PDF</button></a>
                </div>
            </div>
        </div>
    )
}