import axios from 'axios'

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL});

api.interceptors.request.use((req) => {

    if (localStorage.getItem("profile")) {
        const profile = JSON.parse(localStorage.getItem("profile"));

        req.headers.Authorization = `Bearer ${profile.token}`;
    }

    return req;
});


export const login = async ({username, pw}) => api.post("/authentication/login", {username, pw});
export const signup = async ({username, pw, email}) => api.post("/authentication/signup", {username, email, pw});
export const admin = async ({username, pw}) => api.post("/authentication/admin", {username, pw});

export const addprogram= async (program)=> api.post("/programs/addprogram", program)
export const fetchprograms= async ()=> api.get('/programs')
export const fetchSingleProgram= async (id)=> api.get(`/programs/${id}`)
export const addProgramIdToUser= async ({userId, programId})=> api.post('/users/addProgramIdToUser', {userId, programId})
export const getUser= async (id)=> api.get(`/users/getUser/${id}`)
export const uploadPhoto= async (formData)=> api.post(`/admin/uploadPhoto`, formData)