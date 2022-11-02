import axios from "axios";

const API_URL = 'http://localhost:5000'

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

axiosInstance.interceptors.response.use(config => config, async error => {
    

    const originalReq = error.config;
    if (error.response.status === 401 && error.config && !originalReq._isRetry) {
        originalReq._isRetry = true;
        try {
            const resp = await axios.get(`${API_URL}/user/refresh`, {withCredentials: true} );
            localStorage.setItem('token', resp.data.token);
            return axiosInstance.request(originalReq);
        } catch (e) {   
            console.log(e);
        } 
    }
    throw error;
})

export {API_URL};
export default axiosInstance;