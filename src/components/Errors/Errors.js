import React from 'react';
import './Errors.css';

const Errors = ({ globalErrors, loading, localErrors }) => {
    return (
        <div className="errors">
            <h3 className="local-errors">
                {localErrors}
            </h3>
            <h3 className="global-errors">
                {globalErrors}
            </h3>
            <h3 className="loading">
                {loading}
            </h3>
        </div>
    );
};

export default Errors;
