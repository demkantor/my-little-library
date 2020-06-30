import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ImageUpload from '../ImageUpload/ImageUpload';
import './Books.css';

const EditBook = ({ history }) => {
    const dispatch = useDispatch();
    const thisBook = useSelector(state => state.book.thisBook);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [copies, setCopies] = useState('');
    const [bookId, setBookId] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState('');

    // finds title of book by path and dispatches query to db
    useEffect(() => {
        const loadForm = async () => {
            let myBook = window.location.pathname.substr(12);
            dispatch({type: 'GET_THIS_BOOK', payload: myBook});

            setTitle(thisBook.title);
            setAuthor(thisBook.author);
            setCopies(thisBook.copies);
            setBookId(thisBook._id);
            setPreview(`/${thisBook.image}`);
        };

        loadForm();
    }, [dispatch, thisBook.title, thisBook.author, thisBook.copies, thisBook.image, thisBook._id ]);

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
        setPreview(URL.createObjectURL(e.target.files[0]));
    };

    // reset updates form to redux state instead of clearing it
    const resetForm = () => {
        setTitle(thisBook.title);
        setAuthor(thisBook.author);
        setCopies(thisBook.copies);
        setErrors('');
        setImage(thisBook.image);
        setImageName(thisBook.imageName);
        setPreview(`/${thisBook.image}`);
    };

    const saveBook = (event) => {
        event.preventDefault();
        if(image) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('imageName', imageName);
            formData.append('author', author);
            formData.append('title', title);
            formData.append('copies', copies);
            setErrors('Loading...');
            dispatch({ type: 'EDIT_BOOK', payload: {send: formData, history, bookId }});
        } else {
            setErrors('Loading...');
            dispatch({ type: 'EDIT_BOOK', payload: { send: {title, author, copies }, history, bookId }});
        };
    };

    return (
        <div className="container">
            <h1 className="card-title">Edit Book</h1>
            <div className="content-wrapper">
                <div className="books-search">
                    {thisBook
                    ?
                    <form className="books-form">
                        <input 
                            type="text" 
                            placeholder={thisBook._id}
                            disabled />
                        <input 
                            type="text" 
                            placeholder="Title"  
                            value={title || ""}
                            onChange={(event)=>setTitle(event.target.value)} />
                        <input 
                            type="text" 
                            placeholder="Author" 
                            value={author || ""}
                            onChange={(event)=>{setAuthor(event.target.value)}} />
                        <input 
                            type="number"
                            min="1"
                            name="copies"
                            placeholder="copies"
                            value={copies || ""}
                            onChange={(event)=>{setCopies(event.target.value)}} />
                        <ImageUpload 
                            imageName = {imageName}
                            preview = {preview}
                            handleImage = {handleImage} />
                    </form>
                    :
                    <p>loading...</p>
                    }
                    <div className="search-btn-container">
                        <button className="card-btn" onClick={saveBook}>
                            <span className="material-icons btn-icon">
                                save
                            </span> 
                            Save
                        </button>
                        <button className="card-btn white-btn" onClick={resetForm}>
                            <span className="material-icons btn-icon">
                                refresh
                            </span> 
                            Reset
                        </button>
                    </div>
                    <div className="error form-errors">
                        <h3>
                            {errors}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBook;
