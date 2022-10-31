import React from "react";
import HelloContent from "../components/HelloContent/HelloContent";
import HelloForm from "../components/HelloForm/HelloForm";
import Main from "../components/Main/Main";

const HelloPage = props => {
    return (
            
            <Main>
                <div className="hello-container">
                    <HelloContent />
                    <HelloForm />       
                </div>
            </Main>
    )
}

export default HelloPage;