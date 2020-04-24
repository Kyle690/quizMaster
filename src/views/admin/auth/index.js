import React from "react";
import {withStyles} from "@material-ui/core";
import {connect}from 'react-redux';
import {Loading} from "../../../components/Loading";
import LoginForm from "./components/login";
import ForgotPassword from './components/forgotPassword';
import Register from './components/register';
import loginPageStyle from '../../../assets/jss/material-kit-react/views/loginPage';
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {checkUser, loginUser, registerUser, resetPassword} from "../../../store/actions/authActions";
import history from "../../../history";
const image =require('../../../assets/img/bg.jpg');
class Auth extends React.Component{

    state={
        mode:'login',
        loginError:null,
        forgotError:null,
        forgotSuccess:null,
        registerError:null,
        loading:false
    };

    componentDidMount() {
        this.props.checkUser(res=>{
            if(res.status===1){
                history.push('/admin/home/user')
            }
        })
    }


    handleLogin=(formValues)=>{
        this.setState({loading:true});
      this.props.loginUser(formValues,res=>{
          if(res.status===1){
              this.setState({loading:false});
              history.push('/admin/home/user');
          }else{
              this.setState({loading:false,loginError:res.msg});
          }
      })
    };

    handleForgot=(formValues)=>{
        this.setState({loading:true});
      this.props.resetPassword(formValues.email,res=>{
          if(res.status===1){
              this.setState({
                  loading:false,
                  forgotSuccess:'Email has been sent with a link to reset your password.',
                  forgotError:null
              })
          }else{
              this.setState({
                  loading:false,
                  forgotSuccess:null,
                  forgotError:res.msg
              })
          }
      })
    };

    handleRegister=(formValues)=>{
      this.setState({loading:true});
      this.props.registerUser(formValues,res=>{
          if(res.status===1){
              this.setState({loading:false});
              history.push('/admin/home/user');
          }else{
              this.setState({loading:false,registerError:res.msg});
          }
      })
    };

    FormChanger=(form)=>{
      this.setState({mode:form})
    };


    render(){
        const {mode, loginError, forgotError, registerError, forgotSuccess, loading}=this.state;
        const {classes,...rest}=this.props;
        return (
            <div
                style={{
                    backgroundImage:(`url(${image})`),
                    height:window.innerHeight,
                    width:window.innerWidth,
                    backgroundPosition:'center',
                    backgroundRepeat:'no-repeat',
                    backgroundSize:'cover',
                }}
            >
                <Loading
                    show={loading}
                />
                <div className={classes.container}>
                    <GridContainer justify={'center'}>
                        <GridItem xs={12} sm={12} md={4}>
                            {mode==='login'?
                                <LoginForm
                                    onSubmit={this.handleLogin}
                                    error={loginError}
                                    formChange={this.FormChanger}
                                />:mode==='forgotPassword'?
                                    <ForgotPassword
                                        onSubmit={this.handleForgot}
                                        error={forgotError}
                                        formChange={this.FormChanger}
                                        success={forgotSuccess}
                                    />:
                                    <Register
                                        onSubmit={this.handleRegister}
                                        error={registerError}
                                        formChange={this.FormChanger}
                                    />
                            }
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        )
    }
}

export default connect(null,{loginUser, registerUser, resetPassword, checkUser})(withStyles(loginPageStyle)(Auth));