import axiosInstance from "./axiosInstance"


const register = data => {
    const req = axiosInstance.post('/user/register', data);
    return req.then(resp => resp.data)
}

const login = data => {
    const req = axiosInstance.post('/user/login', data);
    return req.then(resp => resp.data)
}

const verify = () => {
    const req = axiosInstance.get('/user/verify', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    return req.then(response => response.data);
}


export default {
    register,
    login,
    verify
}