import React from 'react';
import {Spinner} from 'react-bootstrap'

const SpinningLoader = ({animation, variant}) => {
    return ( 
        <Spinner animation={animation} variant={variant} />
     );
}

export default SpinningLoader;