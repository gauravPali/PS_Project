import React from 'react';

function Error({ errors }) {
    return (
        <ul className="auth-errors list-unstyled bg-danger text-white px-4 py-1">
            {
                errors.map((err, index) => <li key={index}> {err}.</li>)
            }
        </ul>
    )
}

export default Error;