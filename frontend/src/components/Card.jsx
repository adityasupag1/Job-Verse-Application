import React from 'react';

const Card = ({ title, content }) => {
    return (
        <div className='bg-gray-300 p-4 rounded-lg shadow-md mt-4'>
            <h2 className='text-xl font-bold text-blue-500'>{title}</h2>
            {Array.isArray(content) ? (
                content.map((item, index) => <p key={index} className='text-black'>{item}</p>)
            ) : (
                <p className='text-black'>{content}</p>
            )}
        </div>
    );
};

export default Card;