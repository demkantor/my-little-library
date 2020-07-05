import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Pagination.css';


const Pagination = ({ currentPage, numberOfPages }) => {

    const [active, setActive] = useState('active');

    const isFirst = currentPage === 1;
    const isLast = currentPage === numberOfPages;
    const previousPage = currentPage -1 === 1 ? '/' : '/page/' + (currentPage - 1).toString();
    const nextPage = '/page/' + (currentPage + 1).toString();

    const handlePageClick = (page) => {
        console.log(page);
        if (typeof page === 'string') {
            console.log('string')
        } else {
            console.log('number');
        };
    };

    return (
        <div className="page-container">
            <button className="page-btn" onClick={()=>handlePageClick('first')}>
                first
            </button>
            <button className="page-btn" onClick={()=>handlePageClick('prev')}>
                prev
            </button>
            {numberOfPages.map((page, i) => (
                <NavLink to={page} key={i} activeClassName="selected">
                    <button 
                        className="page-btn" 
                        onClick={()=>handlePageClick(i + 1)}>
                        {i + 1}
                    </button>
                </NavLink>
            ))}
            <button className="page-btn" onClick={()=>handlePageClick('next')}>
                next
            </button>
            <button className="page-btn" onClick={()=>handlePageClick('last')}>
                last
            </button>
        </div>
    );
};

export default Pagination;
