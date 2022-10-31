import React, { useState } from "react";
import MyButton from "../../UI/MyButton/MyButton";
import MyInput from "../../UI/MyInput/MyInput";
import userServise from "../../service/userServise";
import { useNavigate } from "react-router-dom";
import "./HelloForm.css";



const HelloForm = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const submit = event => {
        event.preventDefault();
        userServise
            .register({username, password, email})
            .then(data => {
                navigate('/login')
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="hello-form">
            <h2 className="form-title">Sign up form</h2>
            <form onSubmit={submit}>

                <MyInput 
                    value={username} onChange={e => setUsername(e.target.value)}
                    type="text" placeholder="Enter username"/>
                <MyInput
                    value={password} onChange={e => setPassword(e.target.value)} 
                    type="password" placeholder="Enter password"/>
                <MyInput 
                    value={email} onChange={e => setEmail(e.target.value)} 
                    type="email" placeholder="Enter email"/>

                <MyButton type="submit">
                    Submit
                </MyButton>
            </form>
        </div>
    )
}

export default HelloForm;