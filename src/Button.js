import React from 'react';

//Class for button and click handler functions


const Button = (props) => {
    return (
        <button onClick={props.operation}>
            {props.value}
        </button>
    )
}

export default Button;