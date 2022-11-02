import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { publicRoutes, privatRoutes } from "../../router/routes";
import Loader from "../../UI/Loader/Loader";
import Main from "../Main/Main";



const AppRouter = props => {
    const {isAuth, isLoading} = useContext(AuthContext);


    if (isLoading) {
        return <Main>
            <Loader />
        </Main>
    }

    return (
        <>
            {isAuth ? (
                <Routes>
                    {privatRoutes.map(route => {
                        return <Route
                                    key={route.path}
                                    path={route.path}
                                    element={<route.element />}
                                    exact={route.exact}                                
                                />
                    })}
                    
                </Routes>
            ) : (
                <Routes>
                    {publicRoutes.map(route => {
                        return <Route
                                    key={route.path}
                                    path={route.path}
                                    element={<route.element />}
                                    exact={route.exact}                                
                                />
                    })}
                </Routes>
            )}
        
        </>
    )
}


export default AppRouter;