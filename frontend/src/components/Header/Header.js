import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { UserContext } from "../../context/userContext";
import "./header.css";


const Header = props => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('token');
        navigate("/")
    }

    return (
        <header className="header">
            <div className="wrapper">
                <div className="header-content">
                    <Link className="link"  to="/">
                        <h1 className="logo">
                            PlacesApp
                        </h1>
                    </Link>
                   
                    <div>
                       
                       {isAuth ? (
                        <div>
                            <span>
                                {user.username}
                            </span>
                            <span className="logout" onClick={logout}>
                                Logout
                            </span>
                        </div>
                       ) : (
                        <Link className="link" to="/login">
                            Login
                        </Link>
                       )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;





