import React from 'react';
import messageStyles, {message} from "./message.module.scss"


const Message = ({ status, text }) => {
    return status && status !== 'loading' ? (
      <div className={`${message} ${messageStyles[status]}`}>{text}</div>
    ) : null
}

export default Message

