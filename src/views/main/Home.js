import React from "react";
import {connect}from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import {Loading} from "../../components/Loading";
import {submitQuizAnswers, userGetQuiz} from "../../store/actions/quizActions";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Danger from "../../components/Typography/Danger";
import {FormatDate} from "../../Functions";
import {PlayArrow, ChevronRight, ChevronLeft} from "@material-ui/icons";
import Button from '../../components/CustomButtons/Button';
import CustomInput from "../../components/CustomInput/CustomInput";
import QuestionComponent from "./QuestionComponent";
import AnswersComponent from "./AnswersComponent";
import CompleteQuiz from "./CompleteQuiz";
const image = require('../../assets/img/bg.jpg');
class Home extends React.Component{

    componentDidMount() {
        const {loaded,id}=this.props;
        if(!loaded && id){
            const [uid,quizId]=id.split('link');

            this.props.userGetQuiz(uid,quizId,res=>{

                res.status===1?
                    this.setState({
                        loading:false,
                        details:this.props.details,
                        questions:this.props.questions,
                        uid,
                        quizId
                    }):
                    this.setState({
                        loading:false,
                        error:res.msg
                    })
            })
        }else{
            this.setState({loading:false,error:'Error: Incorrect key provided!'})
        }
    }

    state={
        uid:null,
        quizId:null,
        loading:true,
        details:null,
        questions:null,
        error:null,
        started:false,
        name:'',
        questionNo:0,
        answers:{},
        nameComplete:false,
        answersComplete:false,
        quizComplete:false,
        quizCompleteData:null
    };

    renderQuestions=()=>{
        const {name,started,questions,questionNo,answers, nameComplete, answersComplete, quizComplete, quizCompleteData}=this.state;
        if(questions){
            const questionKeys=Object.keys(questions);
            if(!started){
                return (
                    <GridItem container justify={'center'} alignItems={'center'}>
                        <Button onClick={()=>this.setState({started:true})} size={'sm'} color={'info'} round>
                            <PlayArrow/>
                            Start
                        </Button>
                    </GridItem>
                )
            }
            else if(!nameComplete){
                return (
                    <GridItem>
                        <p>Great stuff, lets start with your name. </p>
                        {/* input*/}
                        <CustomInput
                            id={'name'}
                            inputProps={{
                                value:name,
                                placeholder:'Your Name',
                                onChange:this.handleChange('name')
                            }}
                            formControlProps={{
                                fullWidth:true
                            }}
                        />
                        <GridItem xs={12} container justify={'center'}>
                            <Button onClick={()=>this.checkName()} round size={'sm'} color={'warning'}><ChevronRight/>Next</Button>
                        </GridItem>
                    </GridItem>
                )
            }
            else if(quizComplete){
                // build a complete quiz review
                return (
                    <CompleteQuiz
                        answers={quizCompleteData}
                        questions={questions}
                        startOver={this.handleStartOver}
                    />
                )
            }
            else if(answersComplete){
                // end of questions submit answers
                // build something to review answers & build something to start over
               return (
                   <AnswersComponent
                    answers={answers}
                    questions={questions}
                    onSubmit={this.handleSubmitAnswers}
                   />
               )
            }
            else{
                // render questions
                return (
                    <QuestionComponent
                        questionNo={questionNo+1+'/'+questionKeys.length}
                        answer={answers[questionNo]?answers[questionNo]:null}
                        question={questions[questionKeys[questionNo]]}
                        move={this.handleMove}
                    />
                )
            }
        }

    };

    handleMove=(answer, mode)=>{
        const {answers, questionNo, questions} = this.state;
        answers[questionNo]=answer;

        const questionKeys = Object.keys(questions);
        if(mode === 'next'){
            //check if next question exists
            if(questionNo+1<questionKeys.length){
                // move to the next question
                   this.setState({answers,questionNo: questionNo+1});
            }else{
                // end of questions
                this.setState({answers, answersComplete:true});
            }
        }else{
            // check if the previous question works
            if(questionNo-1<0){
                // question No is the beginning
                this.setState({answers,questionNo:0});
            }else{
                // previous question No
                this.setState({answers,questionNo: questionNo-1});
            }
        }
    };


    renderDetails=(details)=>{
        if(details){
            const {date,host}=details;
            return (
                <GridItem container justify={'space-between'} alignItems={'center'}>
                    <h5>Quiz Master: {host}</h5>
                    <h5>Hosted: {FormatDate(date)}</h5>
                </GridItem>
            )
        }
    };

    handleChange=(name)=>event=>{
        this.setState({[name]:event.target.value})
    };

    checkName=()=>{
      const name = this.state.name;
      if(name!==''){
          this.setState({nameComplete:true});
      }else{
          alert('Please check your input, name cannot be blank.')
      }
    };

    handleSubmitAnswers=(answers)=>{
        const {name, uid, quizId, questions}=this.state;
        answers['name']=name;
        this.props.submitQuizAnswers(uid,quizId,answers,questions,res=>{
           res.status===1?
           this.setState({loading:false,quizComplete:true, quizCompleteData:res.data}):
           this.setState({loading:false,error:res.msg})
        });
    };

    handleStartOver=()=>{
      this.setState({
          started:false,
          name:'',
          questionNo:0,
          answers:{},
          nameComplete:false,
          answersComplete:false,
          quizComplete:false,
          quizCompleteData:null
      })
    };

    render(){
        const {loading, error, details, questions, started}=this.state;
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
                <Grid
                    container
                    jusitfy={'center'}
                    alignItems={'center'}
                    spacing={0}
                    direction={'column'}
                    style={{paddingLeft:'10%',paddingRight:'10%'}}
                    >
                    <Card style={{marginTop:'15%'}}>
                        <CardHeader color={'warning'}>
                            <GridItem container justify={'space-between'} align={'center'}>
                                <h2>Pub Quiz</h2>
                                <h3>{details?details.title:''}</h3>
                            </GridItem>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} container justify={'center'}>
                                    <Danger>{error}</Danger>
                                </GridItem>
                                <GridItem xs={12}>
                                    {this.renderDetails(details)}
                                </GridItem>
                                <GridItem xs={12}>
                                    {this.renderQuestions(questions,started)}
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </Grid>
            </div>
        )
    }
}
const mapStateToProps=(state, ownProps)=>{
    const id = ownProps.match.params.id;
    const {details,questions, loaded}=state.userQuiz;

   return{
       id:id?id.slice(1):null,
       loaded,
       details,
       questions
   }
};
export default connect(mapStateToProps, {userGetQuiz, submitQuizAnswers})(Home);