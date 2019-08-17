import React from 'react';

import classes from './Backdrop.module.scss';

const backDrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.cancelModal}></div> : null
)
 
export default backDrop;