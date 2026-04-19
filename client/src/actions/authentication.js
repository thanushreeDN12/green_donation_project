import * as api from '../api'
import { AUTHENTICATION, LOGOUT } from "../constants/actionTypes";

const login=({username, pw, navigate, setError})=>  async (dispatch) => {
    try{
        const { data }= await api.login({username, pw})
        dispatch({type: AUTHENTICATION, data: data})
        navigate('/')
    }catch(err){
        if (setError) setError(err.response?.data?.message || "An error occurred during login");
        console.log(err)
    }
}

const signup=({username, email,pw, navigate, setError})=>  async (dispatch) => {
    try{
        const { data }= await api.signup({username, email, pw})
        dispatch({type: AUTHENTICATION, data: data})
        navigate('/')
    }catch(err){
        if (setError) setError(err.response?.data?.message || "An error occurred during signup");
        console.log(err)
    }
}

const admin=({username, pw, navigate, setError})=>  async (dispatch) => {
    try{
        const { data }= await api.admin({username, pw})
        dispatch({type: AUTHENTICATION, data: data})
        navigate('/')
    }catch(err){
        if (setError) setError(err.response?.data?.message || "An error occurred during admin login");
        console.log(err)
    }
}



const logout=()=> async (dispatch)=>{
    //console.log('inside action')
    dispatch({type: LOGOUT})
}


export {login, signup, admin, logout}
//   const user = JSON.parse(localStorage.getItem("profile"));
//   //console.log(localStorage.getItem("profile"))
//   const username = user?.result?.username;

//   //console.log(username)