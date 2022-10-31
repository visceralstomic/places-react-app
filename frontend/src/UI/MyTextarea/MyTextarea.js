import React from "react";
import cl from "./myTextarea.module.css";

const MyTextarea = props => {
    return <textarea {...props} className={cl.myTextarea}></textarea>
}

export default MyTextarea;