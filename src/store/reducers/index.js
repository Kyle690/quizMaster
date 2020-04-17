import {combineReducers} from "redux";
import {reducer as formReducer}from 'redux-form';

import Auth from './authReducer';
import Admin from './AdminReducer';
import Quiz from './QuizReducers';
import UserQuiz from './UserQuizReducers';
const index={
    form:formReducer,
    auth:Auth,
    admin:Admin,
    quiz:Quiz,
    userQuiz:UserQuiz
};


export default combineReducers(index);