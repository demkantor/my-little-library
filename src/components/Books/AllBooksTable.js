import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Books.css';

const AllBooksTable = ({ handleMainCheck, handleSingleCheck, deleteSelected }) => {
    const dispatch = useDispatch();
    const allBooks = useSelector(state => state.book.allBooks);

    useEffect(() => {
        dispatch({type: 'GET_ALL_BOOKS'});
    }, [dispatch]);

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
                    {allBooks ? 
                        allBooks.map((book) => (
                            <tr key={book._id}>
                                <td>
                                    <input
                                        type="checkbox" 
                                        name="singleCheck"
                                        data-id={book._id}
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
                                    <Link to={`/books/view/${book.title}`}>
                                        <button className="table-btn">
                                            view
                                        </button>
                                    </Link>
                                    <Link to={`/books/view/${book.title}`}>
                                        <button className="table-btn">
                                            edit
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

export default AllBooksTable;
