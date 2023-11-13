// components/Rating.js
import React, { useState, cloneElement } from 'react';

export function Rating({ initialRating = 0, onRatingChange, children }) {
    const [rating, setRating] = useState(initialRating);

    const handleSetRating = (newRating) => {
        setRating(newRating);
        onRatingChange && onRatingChange(newRating);
    };

    const childrenWithProps = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type.displayName === "Star") {
            return cloneElement(child, {
                isFilled: index < rating,
                onClick: () => handleSetRating(index + 1)
            });
        }
        return child;
    });

    return (
        <div className="flex items-center">
            {childrenWithProps}
        </div>
    );
}

export function Star({ isFilled = false, onClick }) {
    return (
        <span
            className={`cursor-pointer ${isFilled ? "text-yellow-300 text-2xl" : "text-gray-400 text-lg"}`}
            onClick={onClick}
        >
            ★
        </span>
    );
}

Star.displayName = "Star";
