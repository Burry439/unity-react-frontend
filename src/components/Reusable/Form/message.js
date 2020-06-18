import React from 'react';
import "./form.css"


const Message = ({ status, text, direction }) => {

    return status && status !== 'loading' ? (
      <div className={`message ${status}`} style={direction}>{text}</div>
    ) : null
}

export default Message

