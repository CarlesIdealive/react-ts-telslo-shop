import axios  from "axios";

const tesloApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL

});

//Interceptor para añadir el token a cada peticion (REquest)
//Cualquier peticion que se haga con tesloApi tendra el token en el header SI existe en el localStorage
tesloApi.interceptors.request.use( (config) => {
    const token = localStorage.getItem('token');
    if (token) 
        config.headers.Authorization = `Bearer ${token}`;

    return config;
})

export {tesloApi};