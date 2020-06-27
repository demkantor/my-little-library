import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Books.css';

const Books = () => {
    const dispatch = useDispatch();
    const allBooks = useSelector(state => state.book.allBooks);

    useEffect(() => {
        dispatch({type: 'GET_ALL_BOOKS'});
    }, [dispatch]);

    const handleSingleCheck = (id) => {
        console.log('check', id)
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
                <button className="card-btn">
                    <span className="material-icons btn-icon">
                        delete
                    </span> 
                    Delete
                </button>
            </div>
            <div className="content-wrapper">
                <div className="books-search">
                    <form className="books-form">
                        <input type="text" placeholder="Title" />
                        <input type="text" placeholder="Author" />
                        <select name="status">
                            <option value="">--</option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select> 
                    </form>
                    <div className="search-btn-container">
                        <button className="card-btn">
                            <span className="material-icons btn-icon">
                                search
                            </span> 
                            Search
                        </button>
                        <button className="card-btn white-btn">
                            <span className="material-icons btn-icon">
                                refresh
                            </span> 
                            Reset
                        </button>
                    </div>
                </div>
                <div className="books-table">
                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox"/></th>
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
                                        <td onChange={()=>handleSingleCheck(book._id)}><input type="checkbox"/></td>
                                        <td><img src={book.image} alt={book.title} className="" width="80px"/></td>
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
                                        <td>view edit delete</td>
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
