export function CommentRating({ value }) {
    const totalStars = 5;
    return (
        <div className="flex items-center">
            {Array.from({ length: totalStars }).map((_, index) => (
                <Star key={index} filled={index < value} />
            ))}
            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {value.toFixed(2)} av 5
            </p>
        </div>
    );
}

function Star({ filled }) {
    return (
        <span className={filled ? 'text-yellow-300 text-lg' : 'text-gray-400 text-sm hover:text-yellow-300 hover:text-lg'}>
            ★
        </span>
    );
}

