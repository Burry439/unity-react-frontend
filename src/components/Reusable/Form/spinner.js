import React from 'react';
import Spinner from 'react-bootstrap/Spinner'
import "./form.css"

const FormSpinner = ({ loading }) => {
    return loading ? (
        <Spinner animation="border" variant="primary" />
    ) : null
  }

  export default FormSpinner