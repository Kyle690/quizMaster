import {USER_LOAD_QUIZ} from "../types";


const INITIAL_STATE={
  loaded:false,
  details:null,
  sections:null
};

export default (state=INITIAL_STATE,action)=>{
    if(action.type===USER_LOAD_QUIZ){
        return {...state,loaded:true,details:action.payload.details,sections:action.payload.sections}
    }else{
        return {...state};
    }
};