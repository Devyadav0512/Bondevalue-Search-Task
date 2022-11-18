import React from "react";
import './card.css';

function Card({data}) {
    return (
        <div className="card">
            <p className="api">Api : {data.API}</p>
            <p className="category">Category: {data.Category}</p>
            <p className="description">Description: {data.Description}</p>
        </div>
    )
}

export default Card;