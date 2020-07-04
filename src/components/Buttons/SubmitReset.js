import React from 'react';
import './Buttons.css';

const SubmitReset = ({ handleSubmit, handleReset, name }) => {
    return (
        <div className="two-btn-container">
            <button className="card-btn" onClick={handleSubmit}>
                <span className="material-icons btn-icon">
                    {name}
                </span> 
                {name}
            </button>
            <button className="card-btn white-btn" onClick={handleReset}>
                <span className="material-icons btn-icon">
                    refresh
                </span> 
                Reset
            </button>
        </div>
    );
};

export default SubmitReset;
