import React, { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';

const Accordion = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='bg-gray-300 p-4 rounded-lg shadow-md mt-4'>
            <div className='flex justify-between items-center' onClick={() => setIsOpen(!isOpen)}>
                <h2 className='text-xl font-bold text-black'>{question}</h2>
                <div>
                    {isOpen ? <BiMinus className='text-2xl text-black' /> : <BiPlus className='text-2xl text-black' />}
                </div>
            </div>
            {isOpen && <p className='text-black mt-2'>{answer}</p>}
        </div>
    );
};

export default Accordion;