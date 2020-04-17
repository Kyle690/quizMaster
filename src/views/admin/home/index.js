import React from "react";
import {connect}from 'react-redux';
import {Switch,Route, withRouter}from 'react-router-dom';
import history from "../../../history";
import HeaderLinks from "../../../components/Header/HeaderLinks";
import Header from "../../../components/Header/Header";
import {logoutUser} from "../../../store/actions/authActions";
import AdminHome from './Home';
import EditQuiz from "./EditQuiz";
import {getQuizes} from "../../../store/actions/quizActions";
import ViewQuiz from "./ViewQuiz";
const image = require('../../../assets/img/bg.jpg');


class AdminMain extends React.Component{

    componentDidMount() {
        if(!this.props.loggedIn){
            history.push('/admin')
        }else{
            this.props.getQuizes(this.props.uid,res=>{
               if(res.status===1){
                  // history.push('/admin/home/user');
               }
            });

        }
    }
    handleLogout=()=>{
        this.props.logoutUser(res=>{
            if(res.status===1){
                history.push('/admin');
            }
        })
    };

    render(){
        const {uid,displayName,...rest}=this.props;
        return (
            <div
                className={'background'}
                style={{
                    backgroundImage:`url(${image})`,
                    height:window.innerHeight,
                    backgroundAttachment: window.innerWidth>'576'? 'fixed':'scroll',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    //textAlign:'center',
                    //paddingTop:'10px',
                    //paddingBottom:'100px',
                    backgroundColor:'rgba(0,0,0,0.5)'
            }}
            >
                <Header
                    brand={'Quiz Master'}
                    fixed
                    color={'transparent'}
                    {...rest}
                    rightLinks={<HeaderLinks handleLogout={this.handleLogout}/>}
                />
                <div style={{height:window.innerHeight*0.90,position:'relative'}}>
                <Switch>
                    <Route path={'/admin/home/user'}  exact component={AdminHome}/>
                    <Route path={'/admin/home/edit'}  component={EditQuiz}/>
                    <Route path={'/admin/home/view'}  component={ViewQuiz}/>
                </Switch>
                </div>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    const {loggedIn, displayName,uid}=state.auth;
  return {
      displayName,
      uid,
      loggedIn
  }
};
export default withRouter(connect(mapStateToProps, {logoutUser, getQuizes})(AdminMain));