import {AUTH_LOGIN,AUTH_LOGOUT} from "../types";

const INITIAL_STATE={
  displayName:null,
  loggedIn:false,
  uid:null
};


export default (state=INITIAL_STATE,action)=>{

    switch (action.type) {
        case AUTH_LOGOUT:
            return {...state,displayName:null, loggedIn:false, uid:null };
        case AUTH_LOGIN:
            return {...state,uid:action.payload.uid,displayName: action.payload.displayName,loggedIn:true};
        default:
            return {...state}
    }
}