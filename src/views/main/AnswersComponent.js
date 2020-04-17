import React from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from '../../components/CustomButtons/Button';
import {Edit} from "@material-ui/icons";
import {Tooltip} from "@material-ui/core";
import CustomTable from '../../components/Table/Table';
import EditQuestionModal from "./EditQuestionModal";
import ConfirmModal from "../../components/Modals/ConfrimModal";
class AnswersComponent extends React.Component{

    state={
      confirmModal:false,
      questionModal:false,
      answers:{},
      editQuestion:null,
      editAnswer:null,
      editQuestionNo:null
    };


    componentDidMount() {
        this.setState({answers:this.props.answers});
    }

    renderAnswers=()=>{
      const answers = this.state.answers;
      const answerKeys = Object.keys(answers);
      const questions = this.props.questions;
      const questionKeys=Object.keys(questions);
      const tableData = answerKeys.reduce((a,v)=>{
          a.push([
             parseInt(v)+1,
             answers[v],
             <Tooltip title={'Edit Answer'}>
                 <Button onClick={()=>this.setState({editQuestionNo:v,editQuestion:questions[questionKeys[v]],editAnswer:answers[v], questionModal:true})}  justIcon round size={'sm'} color={'warning'}>
                     <Edit/>
                 </Button>
             </Tooltip>
          ]);
          return a;
      },[]);

      return (
         <CustomTable
             tableData={tableData}
             tableHead={['Question No','Answer', 'Actions']}
             tableHeaderColor={'warning'}
         />
      )
    };

    handleQuestionUpdate=(answer,questionNo)=>{
        const {answers}=this.state;
        answers[questionNo]=answer;
        this.setState({
            answers,
            editAnswer: null,
            editQuestion: null,
            questionModal: false,
            editQuestionNo: null
        })
    };

    handleSubmitAnswers=()=>{
      const answers = this.state.answers;
      this.setState({confirmModal:false});
      this.props.onSubmit(answers);
    };

    render(){
        const {editAnswer,editQuestion, questionModal,editQuestionNo, confirmModal}=this.state;
        return (
            <GridContainer>
                <EditQuestionModal
                    handleSave={this.handleQuestionUpdate}
                    questionNo={editQuestionNo}
                    question={editQuestion}
                    answer={editAnswer}
                    open={questionModal}
                    close={()=>this.setState({editAnswer: null,editQuestion: null,questionModal: false,editQuestionNo: null})}
                />
                <ConfirmModal
                    open={confirmModal}
                    close={()=>this.setState({confirmModal:false})}
                    title={'Confirm Answers'}
                    content={'Are you sure you want to submit your answers?'}
                    saveAction={this.handleSubmitAnswers}
                />
                <GridItem>
                    <h3><strong>Congratulations, you have finished the quiz.</strong></h3>
                    <h5>Review your answers below and submit.</h5>
                </GridItem>
                <GridItem xs={12}>
                    {this.renderAnswers()}
                </GridItem>
                <GridItem>
                    <Button size={'sm'} onClick={()=>this.setState({confirmModal:true})} block round color={'success'}>Submit Answers</Button>
                </GridItem>
            </GridContainer>
        )
    }
}
export default AnswersComponent;


