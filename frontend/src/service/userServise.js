import axiosInstance, {API_URL} from "./axiosInstance"
import axios from "axios";

const register = data => {
    return axiosInstance.post('/user/register', data).then(response => response.data)
}

const login = data => {
    const req = axiosInstance.post('/user/login', data);
    return req.then(resp => resp.data)
}

const logout = () => {
    const req = axiosInstance.post('/user/logout');
    return req.then(resp => resp.data)
}

const verify = () => {
    const req = axios.get(`${API_URL}/user/refresh`, {withCredentials: true} )

    return req.then(response => response.data);
}


export default {
    register,
    login,
    logout,
    verify
}