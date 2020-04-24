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
import {
    addQuestion,
    addSection,
    deleteQuestion, deleteSection, editSection,
    updateQuestion,
    updateQuizDetails
} from "../../../store/actions/quizActions";
import Questions from "./QuizComponents/Questions";
import Answers from "./QuizComponents/Answers";
import Sections from './QuizComponents/Sections';
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
            <Sections
                sections={this.props.sections}
                addSection={this.addSection}
                editSection={this.editSection}
                deleteSection={this.deleteSection}
                addQuestion={this.addQuestion}
                editQuestion={this.editQuestion}
                deleteQuestion={this.deleteQuestion}
            />
        )
    };

    renderAnswers=()=>{
        return (
            <Answers
                answers={this.props.answers}
                sections={this.props.sections}
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

    // add Section
    addSection=(title)=>{
        const {uid, id}=this.props;
        this.setState({loading:true});
        this.props.addSection(uid,id,title,res=>{
            res.status===1?
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:'Section Added successfully!',
                    notifType:'success'
                }):
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:res.msg,
                    notifType:'danger'
                })
        })
    }
    // edit section
    editSection=(title, sectionId)=>{
        const {uid, id}=this.props;
        this.setState({loading:true});
        this.props.editSection(uid,id,sectionId,title,res=>{
            res.status===1?
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:'Section Updated successfully!',
                    notifType:'success'
                }):
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:res.msg,
                    notifType:'danger'
                })
        })
    }
    // delete section
    deleteSection=(sectionId)=>{
        const {uid, id}=this.props;
        this.setState({loading:true});
        this.props.deleteSection(uid,id,sectionId,res=>{
            res.status===1?
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:'Section Deleted successfully!',
                    notifType:'success'
                }):
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:res.msg,
                    notifType:'danger'
                })
        })
    }

    // todo - add functions to add, delete, edit questions for each section
    // add question
    addQuestion=(data,sectionId)=>{
        const {uid, id}=this.props;
        this.setState({loading:true});
        this.props.addQuestion(uid,id,sectionId,data,res=>{
            res.status===1?
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:'Question Added successfully!',
                    notifType:'success'
                }):
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:res.msg,
                    notifType:'danger'
                })
        })
    }
    // edit question
    editQuestion=(questionData,questionId, sectionId)=>{
        const {uid, id}=this.props;
        this.setState({loading:true});
        this.props.updateQuestion(uid,id,sectionId,questionId,questionData,res=>{
            res.status===1?
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:'Question Updated successfully!',
                    notifType:'success'
                }):
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:res.msg,
                    notifType:'danger'
                })
        })
    }
    // delete question
    deleteQuestion=(sectionId, questionId)=>{
        const {uid, id}=this.props;
        this.setState({loading:true});
        this.props.deleteQuestion(uid,id,questionId,sectionId,res=>{
            res.status===1?
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:'Question Deleted successfully!',
                    notifType:'success'
                }):
                this.setState({
                    loading:false,
                    notif:true,
                    notifMsg:res.msg,
                    notifType:'danger'
                })
        })
    }


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
                    <GridItem xs={12} sm={12} md={10} style={{marginTop:'10%'}}>
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
                            <CardBody style={{backgroundColor:'#fff9ec'}}>
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
    const sections = quiz?quiz.sections?quiz.sections:null:null;
    const answers = quiz?quiz.answers?quiz.answers:null:null;
    return{
        title,
        details,
        uid,
        id,
        sections,
        answers
    }
};

export default withRouter(connect(mapStateToProps,
    {
        updateQuizDetails,
        addQuestion,
        deleteQuestion,
        updateQuestion,
        addSection,
        deleteSection,
        editSection
    })(EditQuiz));