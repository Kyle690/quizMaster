import {auth} from "../../firebase";
import {AUTH_LOGIN, AUTH_LOGOUT} from "../types";

export const registerUser=({fullName,email,password},callback)=>dispatch=>{

    auth.createUserWithEmailAndPassword(email,password)
        .then(()=>{
           const user = auth.currentUser;
           user.updateProfile({
               displayName:fullName
           }).then(()=>{
               dispatch({type:AUTH_LOGIN,payload:{displayName:fullName, uid:user.uid}});
               callback({status:1});
           })
        })
        .catch(err=>err?callback({status:2,msg:err.message}):null)
};

export const loginUser=({email,password},callback)=>dispatch=>{

    auth.signInWithEmailAndPassword(email,password).then(()=>{
        const user = auth.currentUser;
        dispatch({type:AUTH_LOGIN,payload:{displayName:user.displayName,uid:user.uid}});
        callback({status:1});
    }).catch(err=>err?callback({status:2,msg:err.message}):null)
};

export const logoutUser=(callback)=>dispatch=>{
  auth.signOut()
      .then(()=>{
          dispatch({type:AUTH_LOGOUT});
          callback({status:1})
      }).catch(err=>err?callback({status:2,msg:err.message}):null)
};

export const resetPassword=(email,callback)=>dispatch=>{
    auth.sendPasswordResetEmail(email)
        .then(()=>callback({status:1}))
        .catch(err=>err?callback({status:2,msg:err.message}):null)
};

export const checkUser=(callback)=>dispatch=>{
  const user =auth.currentUser;
  if(user){
      dispatch({type:AUTH_LOGIN,payload:{displayName:user.displayName, uid:user.uid}});
      callback({status:1});
  }else{
      callback({status:2})
  }
};