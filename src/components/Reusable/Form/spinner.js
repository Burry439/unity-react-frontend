import React from 'react';
import Spinner from 'react-bootstrap/Spinner'
import spinnerStyle from "./spinner.module.scss"

const FormSpinner = ({ loading }) => {
     return loading ? (
         <Spinner className={spinnerStyle["spinner"]} animation="border" variant="primary"/>
     ) : null
  }

  export default FormSpinner