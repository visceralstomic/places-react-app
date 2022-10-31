import axiosInstance from "./axiosInstance";


axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})



const getAllPlaces = (page, limit) => {
    return axiosInstance
            .get("/places", {params: {page, limit}})
            .then(response => response.data)
}

const createPlace = (data) => {
    return axiosInstance
            .post("/places", data)
            .then(response => response.data)
}


const getPlaceItem = (id) => {
    return  axiosInstance
            .get(`/places/${id}`)
            .then(response => response.data);
}

const updatePlace = (id, data) => {
    return axiosInstance
            .patch(`/places/${id}`, data)
            .then(response => response.data)
}

const deletePlaceItem = (id) => {
    return  axiosInstance
             .delete(`/places/${id}`)
             .then(response => response.data);
}


export default {
    getAllPlaces,
    createPlace,
    getPlaceItem,
    updatePlace,
    deletePlaceItem
}
