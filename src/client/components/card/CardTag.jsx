import React from 'react';

import '../styling/card-tag.css';

export const CardTag = ({ title, handleClick }) => {

    return (
        <aside className="title-tag">
            <div className="tag-container">
                <h2>{title}</h2>
                <button className="card-button" onClick={() => handleClick()}>
                    View
                </button>
            </div>
        </aside>
    )
}