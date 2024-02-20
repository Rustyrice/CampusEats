import React from 'react';

function PopUp(props) {
    const handleClose = () => {
        // Call the onClose prop function passed from the parent component
        if (props.onClose) {
            props.onClose();
        }
    };

    return props.trigger ? (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="z-10 bg-white rounded-lg p-6 relative">
                <button className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800" onClick={handleClose}>
                    &times;
                </button>
                {props.children}
            </div>
        </div>
    ) : null;
}

export default PopUp;

