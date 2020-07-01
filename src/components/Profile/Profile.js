import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ImageUpload from '../ImageUpload/ImageUpload';
import './Profile.css';

const Profile = ({ history }) => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.currentUser.data);

    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profileId, setProfileId] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');
    const [preview, setPreview] = useState(null);

    // gets current user info into form
    useEffect(() => {
        const loadForm = async () => {
            setRole(profile.role);
            setFirstName(profile.firstName);
            setLastName(profile.lastName);
            setEmail(profile.email);
            setPhone(profile.phone);
            setProfileId(profile._id);
            setPreview(`/${profile.image}`);
        };

        loadForm();
    }, [profile.role, profile.firstName, profile.lastName, profile.email, profile.phone, profile.image, profile._id ]);

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
        setPreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleSave = (event) => {
        event.preventDefault();
        if(image) {
            console.log('saving....')
            const formData = new FormData();
            formData.append('image', image);
            formData.append('imageName', imageName);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('phone', phone);
            setErrors('Loading...');
            dispatch({ type: 'UPDATE_PROFILE', payload: {send: formData, history, profileId }});
        } else {
            setErrors('Loading...');
            dispatch({ type: 'UPDATE_PROFILE', payload: { send: { firstName, lastName, email, phone }, history, profileId }});
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
                            value={role || ""}
                            disabled />
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            value={firstName || ""}
                            onChange={(event)=>{setFirstName(event.target.value)}} />
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            value={lastName || ""}
                            onChange={(event)=>{setLastName(event.target.value)}} />
                        <input 
                            type="email" 
                            placeholder="e-mail" 
                            value={email || ""}
                            onChange={(event)=>{setEmail(event.target.value)}} />
                        <input 
                            type="number"
                            min="1"
                            placeholder="Phone Number" 
                            value={phone || ""}
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
