import React from 'react'

const Spinner = (props) => {
    return (
        <div className="d-flex justify-content-center">
            <div className={`spinner-border text-blue ${props.small}`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner