import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Books.css';

const SearchedBooksTable = ({ handleMainCheck, handleSingleCheck, deleteSelected }) => {
    
    const theseBooks = useSelector(state => state.book.theseBooks);

    return (
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
                    {theseBooks ? 
                        theseBooks.map((book) => (
                            <tr key={book._id}>
                                <td>
                                    <input
                                        type="checkbox" 
                                        name="singleCheck"
                                        data-id={book._id}
                                        onChange={()=>handleSingleCheck(book._id)}/>
                                </td>
                                <td>
                                    <Link to={`/books/view/${book.title}`}>
                                        <img src={book.image} alt={book.title} className="" width="80px" height="80px" />
                                    </Link>
                                </td>                                <td>{book.title}</td>
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
                                    <Link to={`/books/view/${book.title}`}>
                                        <button className="table-btn">
                                            view
                                        </button>
                                    </Link>
                                    <button 
                                        className="table-btn"
                                        onClick={()=>deleteSelected(book._id, book.title)}>
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
    );
};

export default SearchedBooksTable;
