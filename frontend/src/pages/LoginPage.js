import React, { useContext, useState } from "react";
import MyButton from "../UI/MyButton/MyButton";
import MyInput from "../UI/MyInput/MyInput";
import userService from "../service/userServise";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification/Notification";


const LoginPage = props => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
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
            .catch(err => {
                const errorData = err.response.data.error;
                setLoginError( <div >{errorData}</div>);
                setTimeout(() => {
                    setLoginError(null)
                }, 7000)
            })
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

                    <Notification message={loginError} msgType="formError" />

                    <MyButton>
                        Login
                    </MyButton>
                </form>
            </div>
        </div>
    )
}


export default LoginPage;