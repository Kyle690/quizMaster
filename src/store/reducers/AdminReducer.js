import {ADMIN_LOAD} from "../types";


const INITIAL_STATE={
    quizes:null,

};

export default (state=INITIAL_STATE,action)=>{
  if(action.type===ADMIN_LOAD){
      return {...state, quizes:action.payload}
  }else{
      return {...state};
  }
};

/*
{id:{
    details:{
        name:'name',
        active:false,
        date:12334230423,
        completed:false
    },
    questions:[
        {
            title:'title',
            type:'text',
            answer:'answer'
        },
        {
            title:'title',
            type:'multi',
            answer:'answer'
        }
    ],
    answers:{
        id:{
            name:'',
            answers:{
                1:'',
                2:'',
                3:''
            }
        }
    }

}}
 */