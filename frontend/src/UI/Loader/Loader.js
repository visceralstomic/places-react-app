import React from "react";
import cl from "./loader.module.css";

const Loader = props => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
        }}>
            <div className={cl.loader}>

            </div>
        </div>
        
    )
}


export default Loader;