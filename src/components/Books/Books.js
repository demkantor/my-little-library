import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AllBooksTable from './AllBooksTable';
import './Books.css';

const Books = () => {
    
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState('');
    const [checked, setChecked] = useState([]);

    const clearForm = () => {
        setTitle('');
        setAuthor('');
        setStatus('');
    };

    const deleteSelected = (id) => {
        if(typeof(id) !== "string"){
            console.log('deleteing item(s) by checkmark...');
        } else {
            console.log('deleteing this...', id);
        };
    };

    const handleMainCheck = () => {
        // console.log(event.target.attributes)
        const childChecks = document.getElementsByName('singleCheck');
        childChecks.forEach((child) => child.toggleAttribute("checked"));
    };

    const handleSingleCheck = (id) => {
        console.log('check', id);
        if(checked.includes(id)) {
            let newList = checked.filter(box => box.indexOf(id) !== -1);
            setChecked(newList);
        }else {
            setChecked([...checked, id]);
        };
        console.log(checked);
    };

    const search = () => {
        if(title === "" && author === "" && status === ""){
            setErrors('Must have criteria in at least one field!');
        };
        console.log('searching db...', title, author, status);
    };

    return (
        <div className="container">
            <h1 className="card-title">Books</h1>
            <div className="btn-container">
                <Link to="/books/new">
                    <button className="card-btn">
                        <span className="material-icons btn-icon">
                            library_add
                        </span> 
                        New
                    </button>
                </Link>
                <button className="card-btn" onClick={deleteSelected}>
                    <span className="material-icons btn-icon">
                        delete
                    </span> 
                    Delete
                </button>
            </div>
            <div className="content-wrapper">
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
                        <select 
                            name="status"
                            value={status}
                            onChange={(event)=>{setStatus(event.target.value)}}>
                                <option value="">--</option>
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                        </select> 
                    </form>
                    <div className="search-btn-container">
                        <button className="card-btn" onClick={search}>
                            <span className="material-icons btn-icon">
                                search
                            </span> 
                            Search
                        </button>
                        <button className="card-btn white-btn" onClick={clearForm}>
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
                <AllBooksTable 
                    handleMainCheck={handleMainCheck}
                    handleSingleCheck={handleSingleCheck}
                    deleteSelected={deleteSelected}/>
            </div>
        </div>
    );
};

export default Books;
