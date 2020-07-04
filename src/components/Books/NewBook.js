import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ImageUpload from '../ImageUpload/ImageUpload';
import SubmitReset from '../Buttons/SubmitReset';
import Errors from '../Errors/Errors';
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

    const handleReset = () => {
        setTitle('');
        setAuthor('');
        setCopies('');
        setErrors('');
        setImage('');
        setImageName('');
        setPreview(null);
    };

    const handleSubmit = (event) => {
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
            } else {
                setErrors('Loading...');
                dispatch({ type: 'ADD_BOOK', payload: { send: {title, author, copies }, history }});
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
                        <ImageUpload 
                            imageName = {imageName}
                            preview = {preview}
                            handleImage = {handleImage}
                            />
                    </form>
                    <SubmitReset 
                        handleSubmit={handleSubmit} 
                        handleReset={handleReset}
                        name={"save"} />
                    <Errors 
                        localErrors={errors} />
                </div>
            </div>
        </div>
    );
};

export default NewBook;
