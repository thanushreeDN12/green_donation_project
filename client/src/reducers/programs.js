import { ADDPROGRAM, FETCH_ALL_PROGRAMS, FETCH_SINGLE_PROGRAM} from "../constants/actionTypes";


const programReducer=(  state= [], action ) => {

    switch(action.type) {
        case FETCH_ALL_PROGRAMS :
            //console.log("inside reducer",action.payload)
            return action.payload  //replaces [] with all programs

         case FETCH_SINGLE_PROGRAM :
            //console.log("inside reducer",action.payload)
            return { ...state, program:action.payload}

        case ADDPROGRAM : 
            //console.log("inside reducer" , action.payload)
            return[ ...state, action.data]


        default:
            return state; // <- always return current state if action not handled
    }
}
export default programReducer