import {ADDPROGRAM, FETCH_ALL_PROGRAMS, GET_USER, FETCH_SINGLE_PROGRAM, UPDATE_USER} from '../constants/actionTypes'
import * as api from '../api/index'

const fetchprograms=()=> async (dispatch) =>{

   try{
        const response = await api.fetchprograms()
         dispatch({ type: FETCH_ALL_PROGRAMS, payload: response.data })
    } catch( error ){
        console.log(error.message)
    }
    
}

const fetchSingleProgram=(id)=> async (dispatch) =>{

   try{
    //console.log('inside action')
        const response = await api.fetchSingleProgram(id)
        //console.log('gotfrom backend', response.data)
        // return response.data
         dispatch({ type: FETCH_SINGLE_PROGRAM, payload: response.data })
    } catch( error ){
        console.log(error.message)
    }
    
}

const addprogram=(program)=> async (dispatch) =>{

    try{
        // console.log('inside action')
        //console.log({title, description})
        //console.log("Sending to backend:", program); 
        const res= await api.addprogram(program)
        // console.log('received response from backend',data)
        dispatch({ type: ADDPROGRAM, payload: res.data})
    }
    catch( error ){
        console.log(error.message)
    }

}

const addProgramIdToUser=({userId, programId})=> async (dispatch) =>{

    try{
        const res= await api.addProgramIdToUser({userId, programId})
        //console.log('received response from backend',res.data)
        dispatch({ type: UPDATE_USER, payload: res.data})
    }
    catch( error ){
        console.log(error.message)
    }
}

const getUser=(id)=> async (dispatch) =>{

    try{
        //console.log('inside action to getuser')
        const res= await api.getUser(id)
        console.log('received response from backend',res.data)
        dispatch({ type: GET_USER, payload: res.data})
    }
    catch( error ){
        console.log(error.message)
    }
}

export {addprogram, getUser,fetchprograms, fetchSingleProgram, addProgramIdToUser}