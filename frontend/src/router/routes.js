import EditPage from "../pages/EditPage"
import HelloPage from "../pages/HelloPage"
import LoginPage from "../pages/LoginPage"
import UserPage from "../pages/UserPage"



export const privatRoutes = [
    {path: '/', element: UserPage, exact: true},
    {path: '/login', element: LoginPage, exact: true},
    {path: "/place/edit/:id", element: EditPage, exact: true}
]


export const publicRoutes = [
    {path: '/', element: HelloPage, exact: true},
    {path: '/login', element: LoginPage, exact: true}
]