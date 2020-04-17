import React from "react";
import {connect}from 'react-redux';
import {withRouter} from "react-router-dom";
import Snackbar from "../../../components/Snackbar/Snackbar";
import {AddAlarm, Close} from "@material-ui/icons";
import {Loading} from "../../../components/Loading";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import NavPills from "../../../components/NavPills/NavPills";
import Button from '../../../components/CustomButtons/Button';
import history from "../../../history";
import Details from "./QuizComponents/Details";
import {addQuestion, deleteQuestion, updateQuestion, updateQuizDetails} from "../../../store/actions/quizActions";
import Questions from "./QuizComponents/Questions";
import Answers from "./QuizComponents/Answers";
class EditQuiz extends React.Component{

    state={
      loading:false,
      notif:false,
      notifMsg:null,
      notifType: 'warning'
    };

    renderDetails=()=>{
        if(this.props.details){
            const link='https://quizmaster-144d7.firebaseapp.com/quiz:'+this.props.uid+'link'+this.props.id;
            return (
                <Details
                    details={this.props.details}
                    handleSave={this.onDetailsSave}
                    link={link}
                />
            )
        }

    };

    renderQuestions=()=>{
        return (
            <Questions
                questions={this.props.questions}
                onSave={this.onQuestionSave}
                onDelete={this.onQuestionDelete}
            />
        )
    };

    renderAnswers=()=>{
        return (
            <Answers
                answers={this.props.answers}
                questions={this.props.questions}
            />
        )
    };

    onDetailsSave=(data)=>{
        const {uid,id}=this.props;
        this.setState({loading:true});
        this.props.updateQuizDetails(uid,id,data,res=>{
            res.status===1?
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:'Details successfully updated!',
                    notifType:'success'
                }):
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:res.msg,
                    notifType:'danger'
                })
        })
    };

    onQuestionSave=(data,id)=>{
        this.setState({loading:true});
      if(id){
          // update existing question
          this.props.updateQuestion(this.props.uid,this.props.id,id,data,res=>{
              res.status===1?
                  this.setState({
                      loading:false,
                      notif:true,
                      notifMsg:'Question Updated Successfully',
                      notifType:'success'
                  }):
                  this.setState({
                      loading:false,
                      notif:true,
                      notifMsg:res.msg,
                      notifType:'warning'
                  })
          })
      }else{
          // add new question
          this.props.addQuestion(this.props.uid,this.props.id,data,res=>{
              res.status===1?
                  this.setState({
                      loading:false,
                      notif:true,
                      notifMsg:'Question Added Successfully',
                      notifType:'success'
                  }):
                  this.setState({
                      loading:false,
                      notif:true,
                      notifMsg:res.msg,
                      notifType:'warning'
                  })
          })

      }
    };

    onQuestionDelete=(id)=>{
        this.setState({loading:true});
        this.props.deleteQuestion(this.props.uid,this.props.id,id,res=>{
            res.status===1?
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:'Question deleted Successfully',
                    notifType:'success'
                }):
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:res.msg,
                    notifType:'warning'
                })
        })
    };


    render(){
        const {loading,notif,notifMsg,notifType}=this.state;
        const {title}=this.props;
        return (
            <div className={'mainDiv'}>
                <Loading
                    show={loading}
                />
                <Snackbar
                    icon={AddAlarm}
                    place={'br'}
                    open={notif}
                    color={notifType}
                    message={notifMsg}
                    close={()=>this.setState({notif:false,notifMsg:null, notifType: 'warning'})}
                />
                <GridContainer  justify={'center'} >
                    <GridItem xs={12} sm={12} md={8} style={{marginTop:'10%'}}>
                        <Card>
                            <CardHeader color={'warning'}>
                                <GridItem container justify={'space-between'} alignItems={'center'}>
                                    <h3>{title}</h3>
                                    <Button simple color={'white'} onClick={()=>history.push('/admin/home/user')}>
                                        <Close/>
                                        Close Quiz
                                    </Button>
                                </GridItem>
                            </CardHeader>
                            <CardBody>
                                <NavPills
                                    color={'warning'}
                                    tabs={[
                                        {
                                            tabButton:'Details',
                                            tabContent:this.renderDetails()
                                        },
                                        {
                                            tabButton:'Questions',
                                            tabContent:this.renderQuestions()
                                        },
                                        {
                                            tabButton:'Answers',
                                            tabContent:this.renderAnswers()
                                        }
                                    ]}
                                />
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{

    const uid = state.auth.uid;
    const quiz =state.quiz.editQuiz;
    const details= quiz?quiz.details:null;
    const title=quiz?quiz.details.title:'';
    const id = quiz?quiz.id:null;
    const questions = quiz?quiz.questions?quiz.questions:null:null;
    const answers = quiz?quiz.answers?quiz.answers:null:null;
    return{
        title,
        details,
        uid,
        id,
        questions,
        answers
    }
};

export default withRouter(connect(mapStateToProps, {updateQuizDetails, addQuestion, deleteQuestion, updateQuestion})(EditQuiz));