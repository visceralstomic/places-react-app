import React, { useContext, useState } from "react";
import MyButton from "../UI/MyButton/MyButton";
import MyInput from "../UI/MyInput/MyInput";
import userService from "../service/userServise";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";


const LoginPage = props => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = event => {
        event.preventDefault();
        userService
            .login({email, password})
            .then(data => {
                const {user, token} = data;
                localStorage.setItem("token", token);
                setIsAuth(true)
                navigate("/")
            })
            .catch(err => console.log(err))
    }

    return (
      
            <div className="login">
            <div className="login-form">
                <h2 className="form-title">Login form</h2>
                <form onSubmit={submit}>
                    <MyInput value={email} onChange={e => setEmail(e.target.value)}
                        type="email" placeholder="Enter email"/>
                    <MyInput  value={password} onChange={e => setPassword(e.target.value)}
                        type="password" placeholder="Enter password" />
                    <MyButton>
                        Login
                    </MyButton>
                </form>
            </div>
        </div>
    )
}


export default LoginPage;