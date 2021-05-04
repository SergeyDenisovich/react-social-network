import React from 'react';
import preloader from '../../../assets/images/Spinner-1s-200px.svg';

const Preloader = (props) => {
    return (
        <div>
            <img src={preloader} alt="preloader" />
        </div>
    );
};

export default Preloader;
