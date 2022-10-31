import React from "react";
import cl from "./modal.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' 


const Modal = ({children, visible, setVisible}) => {

    const rootCl = [cl.modalContainer];

    if (visible) rootCl.push(cl.active);

    return (
        <div className={rootCl.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.modal} onClick={ e => e.stopPropagation()}>
                <div className={cl.headerModal}>
                    <FontAwesomeIcon 
                        icon={solid("x")}
                        onClick={() => setVisible(false)}
                        style={{
                            cursor: "pointer"
                        }}
                    />
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;