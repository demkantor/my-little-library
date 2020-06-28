import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Books.css';

const Books = () => {
    const dispatch = useDispatch();
    const allBooks = useSelector(state => state.book.allBooks);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState('');
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        dispatch({type: 'GET_ALL_BOOKS'});
    }, [dispatch]);

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
        }
        
    };

    const handleMainCheck = () => {
        // console.log(event.target.attributes)
        const childChecks = document.getElementsByName('singleCheck');
        childChecks.forEach((child) => child.toggleAttribute("checked"))
    };

    const handleSingleCheck = (id) => {
        console.log('check', id);
        setChecked([...checked, id]);
    };

    const search = () => {
        if(title === "" && author === "" && status === ""){
            setErrors('Must have criteria in at least one field!');
        }
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
                <div className="books-table">
                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" onChange={handleMainCheck}/></th>
                                <th></th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {allBooks ? 
                                allBooks.map((book) => (
                                    <tr key={book._id}>
                                        <td>
                                            <input
                                                type="checkbox" 
                                                name="singleCheck"
                                                onChange={()=>handleSingleCheck(book._id)}/>
                                        </td>
                                        <td><img src={book.image} alt={book.title} className="" width="80px" height="80px"/></td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>
                                            {book.status 
                                            ?
                                            <button className="card-btn green-btn">
                                                Available
                                            </button>
                                            :
                                            <button className="card-btn red-btn">
                                                Unavailable
                                            </button>
                                            }
                                        </td>
                                        <td>
                                            <Link to="/books/book._id">
                                                <button className="table-btn">
                                                    view
                                                </button>
                                            </Link>
                                            <Link to="/books/book._id">
                                                <button className="table-btn">
                                                    edit
                                                </button>
                                            </Link>
                                            <button 
                                                className="table-btn"
                                                onClick={()=>deleteSelected(book._id)}>
                                                    delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            : 'loading...'
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default Books;
