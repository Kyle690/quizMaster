import {USER_LOAD_QUIZ} from "../types";


const INITIAL_STATE={
  loaded:false,
  details:null,
  questions:null
};

export default (state=INITIAL_STATE,action)=>{
    if(action.type===USER_LOAD_QUIZ){
        return {...state,loaded:true,details:action.payload.details,questions:action.payload.questions}
    }else{
        return {...state};
    }
};