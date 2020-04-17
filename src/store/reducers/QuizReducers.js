import {LOAD_QUIZ, VIEW_QUIZ} from "../types";

const INITIAL_STATE={
  editQuiz:null,
  viewQuiz:null
};

export default (state=INITIAL_STATE,action)=>{

    switch(action.type){
        case LOAD_QUIZ:
            return {...state, editQuiz:action.payload };
        case VIEW_QUIZ:
            return {...state,viewQuiz: action.payload};
        default:
            return {...state};
    }
};