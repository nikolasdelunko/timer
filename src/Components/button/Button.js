import React from 'react';
import './button.css'

const Button = ({text, start, funk, off}) => {
    return (
        <div className='btn-container'>
           <button className='btn'
                   onClick={start}
                   disabled={off}
               onDoubleClick={() => funk()}
            >{text}</button>
        </div>
    );
};

export default Button;