import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import AllBooksTable from './AllBooksTable';
import './Books.css';

const Books = () => {
    const dispatch = useDispatch();
    
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

    // calls didpatch to remove one book or multiple books
    const deleteSelected = (id, title) => {
        console.log(checked);
        if(typeof(id) !== "string"){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    Swal.fire(
                    'Deleted!',
                    'This book has been deleted.',
                    'success'
                    );
                    dispatch({ type: 'REMOVE_MANY_BOOKS', payload: checked });
                }
            });
            console.log('deleteing item(s) by checkmark...');
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: `Permanently delete ${title} from your collection?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    Swal.fire(
                        'Deleted!',
                        `${title} has been removed from your collection!`,
                        'success'
                    );
                    dispatch({ type: 'REMOVE_BOOK', payload: id });
                } else {
                    Swal.fire(
                        'Not Deleted',
                        `${title} is still in your collection`,
                        'warning'
                    );
                };
            });
            console.log('deleteing this...', id);
        };
    };

    const handleMainCheck = (event) => {
        console.log(checked);
        console.log(event.target.value);
        const childChecks = document.getElementsByName('singleCheck');
        childChecks.forEach((child) => child.toggleAttribute("checked"));
        const newList = []
        childChecks.forEach((child) => newList.push(child.dataset.id));
        setChecked(newList);
    };

    const handleSingleCheck = (id) => {
        console.log('check', id);
        if(checked.includes(id)) {
            let newList = checked.filter(box => box.indexOf(id) === -1);
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
                <button className="card-btn" disabled={checked.length < 1} onClick={deleteSelected}>
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
