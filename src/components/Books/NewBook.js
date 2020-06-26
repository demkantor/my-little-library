import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import './Books.css';



const NewBook = ({ history }) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [copies, setCopies] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
        setPreview(URL.createObjectURL(e.target.files[0]));
    };

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setCopies('');
        setErrors('');
        setImage('');
        setImageName('');
        setPreview(null);
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
            if(image) {
                const formData = new FormData();
                formData.append('image', image);
                formData.append('imageName', imageName);
                formData.append('author', author);
                formData.append('title', title);
                formData.append('copies', copies);
                setErrors('Loading...');
                dispatch({ type: 'ADD_BOOK', payload: {send: formData, history }});
                // history.push("/books");
            } else {
                setErrors('Loading...');
                dispatch({ type: 'ADD_BOOK', payload: { send: {title, author, copies }, history }});
                // history.push("/books");
            };
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
                            {imageName 
                            ?
                            <label 
                                className="img-label"
                                htmlFor="image-upload">
                                    {imageName}
                            </label>
                            :
                            <label 
                                className="img-label"
                                htmlFor="image-upload">
                                    Upload Image
                            </label>
                            }
                            <div className="image-upload">
                                <span className={preview ? "remove" : "material-icons img-icon"}>
                                        add
                                    </span> 
                                <input
                                    type="file"
                                    name="image-upload"
                                    accept=".png, .jpg, .jpeg"
                                    className="image-preview hide"
                                    // value={image}
                                    onChange={handleImage} />
                                {preview &&
                                    <img src={preview} alt='preview' width="300px"/>
                                }
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
