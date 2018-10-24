import React from 'react';

const Display = (props) => {
    return(
        <div>
            <p className={props.className}>{props.value}</p>
        </div>
    );
}

export default Display;