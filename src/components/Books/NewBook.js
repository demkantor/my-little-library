import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import './Books.css';



const NewBook = ({ history }) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [copies, setCopies] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setCopies('');
        setErrors('');
    };

    const saveBook = (event) => {
        event.preventDefault();
        if(title === ''){
            setErrors('Must include a title!!');
        } else if(author === ''){
            setErrors('Must include an author!!');
        } else if(copies === ''){
            setErrors('Must have at least one copy!!');
        } else {
            setErrors('Loading...');
            dispatch({ type: 'ADD_BOOK', payload: { title, author, copies, image }});
            history.push("/books");
        };
    };


    return (
        <div className="container">
            <div className="content-wrapper">
                <h1 className="card-title">New Book</h1>
                <div className="books-search">
                    <form className="books-form">
                        <input 
                            type="text" 
                            placeholder="Title" 
                            value={title}
                            onChange={(event)=>{setTitle(event.target.value)}} />
                        <input 
                            type="text" 
                            placeholder="Author" 
                            value={author}
                            onChange={(event)=>{setAuthor(event.target.value)}} />
                        <input 
                            type="number"
                            min="1"
                            placeholder="Number of Copies" 
                            value={copies}
                            onChange={(event)=>{setCopies(event.target.value)}} />
                        <div className="image-upload-wrapper">
                            <label 
                                className="img-label"
                                htmlFor="image-upload">
                                    Upload Image
                            </label>
                            <div className="image-upload">
                                <span className="material-icons img-icon">
                                        add
                                    </span> 
                                <input
                                    type="file"
                                    name="image-upload"
                                    accept=".png, .jpg, .jpeg"
                                    className="image-preview hide"
                                    value={image}
                                    onChange={(event)=>{setImage(event.target.value)}} />
                            </div>
                        </div>
                    </form>
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
                </div>
                <div className="error form-errors">
                        <h3>
                            {errors}
                        </h3>
                </div>
            </div>
        </div>
    )
};

export default NewBook;
