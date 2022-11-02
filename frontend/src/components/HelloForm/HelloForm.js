import React, { useState } from "react";
import MyButton from "../../UI/MyButton/MyButton";
import MyInput from "../../UI/MyInput/MyInput";
import userServise from "../../service/userServise";
import Notification from "../Notification/Notification";
import "./HelloForm.css";



const HelloForm = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [helloFormErrors, setHelloFormErrors] = useState(null);
    const [helloFormSuccess, setHelloFormSuccess] = useState(null);


    const submit = event => {
        event.preventDefault();
        userServise
            .register({username, password, email})
            .then(data => {
                setHelloFormSuccess('You are successfully registered. Now you can login');
                setTimeout(() => {
                    setHelloFormSuccess(null);
                }, 7000)
            })
            .catch(error => {
                const errorData = error.response.data.errors;
                setHelloFormErrors(errorData.map(error => <div key={error}>{error}</div>));

                setTimeout(() => {
                    setHelloFormErrors(null);
                }, 7000)

            });
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

                <Notification  message={helloFormErrors} msgType="formError"/>
                <Notification  message={helloFormSuccess} msgType="success"/>
                <MyButton type="submit">
                    Submit
                </MyButton>
            </form>
        </div>
    )
}

export default HelloForm;