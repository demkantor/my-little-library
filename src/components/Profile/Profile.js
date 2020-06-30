import React, { useState } from 'react';

import ImageUpload from '../ImageUpload/ImageUpload';
import './Profile.css';

const Profile = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');
    const [preview, setPreview] = useState(null);

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
        setPreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleSave = (event) => {
        event.preventDefault();
        if(image) {
            console.log('saving....')
        //     const formData = new FormData();
        //     formData.append('image', image);
        //     formData.append('imageName', imageName);
        //     formData.append('author', author);
        //     formData.append('title', title);
        //     formData.append('copies', copies);
        //     setErrors('Loading...');
        //     dispatch({ type: 'ADD_BOOK', payload: {send: formData, history }});
        // } else {
        //     setErrors('Loading...');
        //     dispatch({ type: 'ADD_BOOK', payload: { send: {title, author, copies }, history }});
        };
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setErrors('');
        setImage('');
        setImageName('');
        setPreview(null);
    };


    return (
        <div className="container">
            <h1 className="card-title">Edit Profile</h1>
            <div className="content-wrapper">
            <div className="books-search">
                    <form className="books-form">
                        <input
                            type="text"
                            placeholder="Role"
                            disabled />
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            value={firstName}
                            onChange={(event)=>{setFirstName(event.target.value)}} />
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            value={lastName}
                            onChange={(event)=>{setLastName(event.target.value)}} />
                        <input 
                            type="email" 
                            placeholder="e-mail" 
                            value={email}
                            onChange={(event)=>{setEmail(event.target.value)}} />
                        <input 
                            type="number"
                            min="1"
                            placeholder="Phone Number" 
                            value={phone}
                            onChange={(event)=>{setPhone(event.target.value)}} />
                        <ImageUpload 
                            imageName = {imageName}
                            preview = {preview}
                            handleImage = {handleImage}
                            />
                    </form>
                    <div className="search-btn-container">
                        <button className="card-btn" onClick={handleSave}>
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

export default Profile;
