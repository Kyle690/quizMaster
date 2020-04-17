import {database} from "../../firebase";
import {ADMIN_LOAD, LOAD_QUIZ, USER_LOAD_QUIZ, VIEW_QUIZ} from "../types";
import stringSimilarity from 'string-similarity';

export const getQuizes=(uid,callback)=>dispatch=>{
  const ref = database.ref(`quizes/${uid}`);
    ref.on('value',snap=>{
        const quizes = snap.val();
        if(quizes){
            dispatch({type:ADMIN_LOAD,payload:quizes});
            callback({status:1})
        }else{
            callback({status:1})
        }
    })//.catch(err=>err?callback({status:2,msg:err.message}):null)

};

export const addQuiz =(data,uid,displayName,callback)=>(dispatch,getState)=>{
    const {title, date}=data;
    const ref = database.ref(`quizes/${uid}`);

    ref.push({
        details:{
            title,
            date,
            host:displayName,
            active:false,
            completed:false},
        questions:null,
        answers:null
    }).then(snap=>{
        const key =snap.key;
        const quizData=getState().admin.quizes[key];
        quizData['id']=key;
        dispatch({type:LOAD_QUIZ,payload:quizData});
        callback({status:1});
    }).catch(err=>err?callback({status:2,msg:err.message}):null);

};

export const editQuiz=(data,callback)=>dispatch=>{
    dispatch({type:LOAD_QUIZ,payload:data});
    callback({status:1})
};

export const viewQuiz=(data,callback)=>dispatch=>{
    dispatch({type:VIEW_QUIZ,payload:data});
    callback({status:1});
};

export const deleteQuiz=(uid,id,callback)=>(dispatch)=>{
    const ref = database.ref(`quizes/${uid}/${id}`);
    ref.remove()
        .then(()=>{
            //const fetchQuizes=getQuizes(uid,res=>res.status===1);
            callback({status:1})
        })
        .catch(err=>err?callback({status:2,msg:err.message}):null)
};

export const updateQuizDetails=(uid,id,data,callback)=>(dispatch, getState)=>{
    const ref = database.ref(`quizes/${uid}/${id}/details`);
    const {title,date,completed,active}=data;
    ref.update({title,date:date.toString(),completed,active})
        .then(()=>{
            const newData = getState().admin.quizes[id];
            newData['id']=id;
            dispatch({type:LOAD_QUIZ,payload:newData});
            callback({status:1});
        }).catch(err=>err?callback({status:2,msg:err.message}):null)
};

export const addQuestion=(uid,quizId,data,callback)=>(dispatch,getState)=>{
    const {title,answer,type,A,B,C,D}=data;
    const ref = database.ref(`quizes/${uid}/${quizId}/questions`);
    ref.push({
        title,
        answer,
        type,
        options:type==='multiple'?{A,B,C,D}:null
    }).then(()=>{
        const newData = getState().admin.quizes[quizId];
        newData['id']=quizId;
        dispatch({type:LOAD_QUIZ,payload:newData});
        callback({status:1});
    }).catch(err=>err?callback({status:2,msg:err.message}):null);
};
export const updateQuestion=(uid,quizId,questionId,data,callback)=>(dispatch,getState)=>{
    const ref =database.ref(`quizes/${uid}/${quizId}/questions/${questionId}`);
    const {title,answer,type,A,B,C,D}=data;
    ref.update({
        title,
        answer,
        type,
        options:type==='multiple'?{A,B,C,D}:null
    }).then(()=>{
        const newData = getState().admin.quizes[quizId];
        newData['id']=quizId;
        dispatch({type:LOAD_QUIZ,payload:newData});
        callback({status:1});
    }).catch(err=>err?callback({status:2,msg:err.message}):null);


};

export const deleteQuestion=(uid,quizId,questionId, callback)=>(dispatch,getState)=>{
    const ref =database.ref(`quizes/${uid}/${quizId}/questions/${questionId}`);
    ref.remove()
        .then(()=>callback({status:1}))
        .catch(err=>err?callback({status:2,msg:err.message}):null);
};

export const userGetQuiz=(uid,quizId,callback)=>dispatch=>{

    const ref = database.ref(`quizes/${uid}/${quizId}`);
    ref.once('value').then(snap=>{
        const quiz= snap.val();
        if(quiz){
            const {host, title, completed, active, date}=quiz.details;
            const questions = quiz.questions?quiz.questions:null;

            if(!completed && active && questions){
                const newDetails = {host,title,date};
                dispatch({type:USER_LOAD_QUIZ,payload:{questions,details:newDetails}});

                callback({status:1});


            }else{
                callback({status:2, msg:'This quiz is not available at this moment, please contact your quiz master.'})
            }
        }else{
            callback({status:2,msg:'Error: Incorrect key, please check you have the right link, or check with your quiz master.'})
        }


    }).catch(err=>err?callback({status:2,msg:err.message}):null)


};

export const submitQuizAnswers=(uid,quizId,answers,questions, callback)=>dispatch=>{

    const data=Object.keys(questions).reduce((a,v,i)=>{

        const correctAnswer  = questions[v].answer;
        const answer = answers[i];
        const percentage =stringSimilarity.compareTwoStrings(correctAnswer.toLowerCase(),answer.toLowerCase());

        a[i]={
          answer,
          correct:percentage>=0.4,
          percentage
        };
        return a;
    },{});

    data['name']=answers['name'];

  const ref = database.ref(`quizes/${uid}/${quizId}/answers`);
  ref.push(data)
      .then(()=>{

          callback({status:1, data})
      }).catch(err=>err?callback({status:2,msg:err.message}):null)
};