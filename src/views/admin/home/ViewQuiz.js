import React from "react";
import {connect}from 'react-redux';
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import Button from "../../../components/CustomButtons/Button";
import history from "../../../history";
import {Close, PlayArrow, ChevronLeft,ChevronRight, Refresh} from "@material-ui/icons";
import CardBody from "../../../components/Card/CardBody";
import GridContainer from "../../../components/Grid/GridContainer";

class ViewQuiz extends React.Component{

    state={
      questionNo:0,
      start:false,
      finish:false
    };

    renderQuestions=()=>{
        if(this.props.questions){
            const {questionNo,start, finish}=this.state;
            if(!start){
                return (
                    <GridContainer justify={'center'}>
                        <Button onClick={()=>this.setState({start:true})} round color={'info'}>
                            <PlayArrow/>
                            Start
                        </Button>
                    </GridContainer>
                )
            }else if(finish){
                return (
                    <GridContainer justify={'center'}>
                        <Button onClick={()=>this.setState({start:false, finish: false,questionNo: 0})} round color={'info'}>
                            <Refresh/>
                            Start Over
                        </Button>
                    </GridContainer>
                )
            }
            else{
                const questions = this.props.questions;
                const keys = Object.keys(questions);
                const {title} = questions[keys[questionNo]];
                const Previous=questionNo-1<0?0:questionNo-1;
                const Next= questionNo+1>keys.length?keys.length-1:questionNo+1;
                const Finish= questionNo+1>=keys.length;
                return (
                    <GridContainer >
                        <GridItem xs={12} sm={12} md={12}>
                            <h3>Question No {questionNo+1}/{keys.length}</h3>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} container justify={'center'} style={{paddingTop:50, paddingBottom:50}}>
                            <h3>{title}</h3>
                        </GridItem>
                        <GridItem xs={6} container justify={'flex-end'}>
                            <Button onClick={()=>this.setState({questionNo:Previous})} color={'warning'} size={'sm'} round>
                                <ChevronLeft/>
                                Previous
                            </Button>
                        </GridItem>
                        <GridItem xs={6}>
                            <Button onClick={()=>this.setState({questionNo:Next, finish:Finish})} color={'warning'} size={'sm'} round>
                                <ChevronRight/>
                                Next
                            </Button>
                        </GridItem>
                    </GridContainer>
                )
            }
        }else{
            return (
                <div>
                    <h3>No Questions yet!</h3>
                </div>
            )
        }



    };


    render(){
        const {title}=this.props;
        return (
            <GridContainer  justify={'center'} className={'mainDiv'} >
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
                            {this.renderQuestions()}
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        )
    }
}
const mapStateToProps =state=>{

    const uid = state.auth.uid;
    const quiz =state.quiz.viewQuiz;
    const details= quiz?quiz.details:null;
    const title=quiz?quiz.details.title:'';
    const id = quiz?quiz.id:null;
    const questions = quiz?quiz.questions?quiz.questions:null:null;

    return{
        title,
        details,
        uid,
        id,
        questions
    }
};

export default connect(mapStateToProps)(ViewQuiz);