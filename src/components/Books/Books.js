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
            <div className="content-wrapper">
                <div className="books-search">

                </div>
                <div className="books-table">
                    
                </div>
            </div>
            </div>
        </div>
    )
};

export default Books;
