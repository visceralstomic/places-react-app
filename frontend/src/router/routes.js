import EditPage from "../pages/EditPage"
import HelloPage from "../pages/HelloPage"
import LoginPage from "../pages/LoginPage"
import NoFoundPage from "../pages/NoFoundPage"
import UserPage from "../pages/UserPage"
import { Navigate } from "react-router-dom"


const Redirect = () =>  <Navigate replace to="/place"/>


export const privatRoutes = [
    {path: '/', element: Redirect, exact: true},
    {path: '/place', element: UserPage, exact: true},
    {path: '/login', element: LoginPage, exact: true},
    {path: "/place/edit/:id", element: EditPage, exact: true},
    {path: '*', element: NoFoundPage, exact: true}
]


export const publicRoutes = [
    {path: '/', element: Redirect, exact: true},
    {path: '/place', element: HelloPage, exact: true},
    {path: '/login', element: LoginPage, exact: true},
    {path: '*', element: NoFoundPage, exact: true}
]