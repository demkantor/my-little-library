import React from 'react';
import './Books.css';

const Books = () => {
    return (
        <div className="container">
            <h1 className="card-title">Books</h1>
            <div className="btn-container">
                <button className="card-btn">
                    <span className="material-icons btn-icon">
                        library_add
                    </span> 
                    New
                </button>
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
                        <button className="card-btn white">
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
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td><img src="/images/blink.png" alt="blink" className="" width="80px"/></td>
                                <td>Title</td>
                                <td>Author</td>
                                <td>Status</td>
                                <td>view edit delete</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td><img src="/images/god-delusion.png" alt="The God Delusion" className="" width="80px"/></td>
                                <td>Title</td>
                                <td>Author</td>
                                <td>Status</td>
                                <td>view edit delete</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default Books;
