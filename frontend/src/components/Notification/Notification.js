import React from "react";
import "./notification.css";



const Notification = ({msgType, message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className={msgType}>
            {message}
        </div>
    )
}

export default Notification;