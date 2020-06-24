import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import './Books.css';



const NewBook = () => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [copies, setCopies] = useState('');
    const dispatch = useDispatch();

    const saveBook = () => {
        dispatch({ type: 'ADD_BOOK', payload: {title, author, copies }})
    }


    return (
        <div className="container">
            <h1 className="card-title">New Book</h1>
            <div className="books-search">
                <form className="books-form">
                    <input 
                        type="text" 
                        placeholder="Title" 
                        value={title}
                        onChange={(event)=>{setTitle(event.target.value)}}/>
                    <input 
                        type="text" 
                        placeholder="Author" 
                        value={author}
                        onChange={(event)=>{setAuthor(event.target.value)}}/>
                    <input 
                        type="number" 
                        placeholder="Number of Copies" 
                        value={copies}
                        onChange={(event)=>{setCopies(event.target.value)}}/>
                </form>
                <div className="search-btn-container">
                    <button className="card-btn" onClick={saveBook}>
                        <span className="material-icons btn-icon">
                            save
                        </span> 
                        Save
                    </button>
                    <button className="card-btn white-btn">
                        <span className="material-icons btn-icon">
                            refresh
                        </span> 
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
};

export default NewBook;
