import React from 'react';
import './display.css'

function Display({time}) {
    return (
        <div className="Display-container">
            <span className='time H'>{(time.HH >= 10)? time.HH : '0' + time.HH}</span>
            <p className='time-dots'>:</p>
            <span className='time M'>{(time.MM >= 10)? time.MM : '0' + time.MM}</span>
            <p className='time-dots'>:</p>
            <span className='time S'>{(time.SS >= 10)? time.SS : '0' + time.SS}</span>
        </div>
    );
}

export default Display;
