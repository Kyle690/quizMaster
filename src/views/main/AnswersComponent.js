import React from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from '../../components/CustomButtons/Button';
import {Edit} from "@material-ui/icons";
import {Tooltip} from "@material-ui/core";
import CustomTable from '../../components/Table/Table';
import EditQuestionModal from "./EditQuestionModal";
import ConfirmModal from "../../components/Modals/ConfrimModal";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
class AnswersComponent extends React.Component{

    state={
      confirmModal:false,
      questionModal:false,
      answers:null,
      sectionId:null,
      editQuestion:null,
      editAnswer:null,
      editQuestionNo:null
    };


    componentDidMount() {
        this.setState({answers:this.props.answers});
    }

    renderAnswers=()=>{
      const sections = this.props.sections;
      const sectionKeys = Object.keys(sections);
      const answers = this.state.answers;


      if(answers){
          return (
              <div>
                  {sectionKeys.map(key=>{
                      const sectionAnswers = answers[key];
                      const title = sections[key].title;
                      const questions = sections[key].questions;
                      if(questions){
                          const questionKeys=Object.keys(questions);
                          const answerKeys = Object.keys(sectionAnswers);
                          const tableData = answerKeys.reduce((a,v)=>{
                              a.push([
                                  parseInt(v)+1,
                                  sectionAnswers[v],
                                  <Tooltip title={'Edit Answer'}>
                                      <Button onClick={
                                          ()=>this.setState({
                                              editQuestionNo:v,
                                              editQuestion:questions[questionKeys[v]],
                                              editAnswer:sectionAnswers[v],
                                              sectionId:key,
                                              questionModal:true
                                          })}
                                              justIcon round size={'sm'} color={'warning'}>
                                          <Edit/>
                                      </Button>
                                  </Tooltip>
                              ]);
                              return a;
                          },[]);

                          return (
                              <Card style={{paddingTop:15,paddingBottom:15}}>
                                  <CardHeader color={'info'}>
                                      <h5>Sections: {title}</h5>
                                  </CardHeader>
                                  <CardBody>
                                      <CustomTable
                                          tableData={tableData}
                                          tableHead={['Question No','Answer', 'Actions']}
                                          tableHeaderColor={'warning'}
                                      />
                                  </CardBody>

                              </Card>
                          )
                      }
                  })}
              </div>
          )
      }


    };

    handleQuestionUpdate=(answer,questionNo)=>{
        const {answers, sectionId}=this.state;
        answers[sectionId][questionNo]=answer;
        this.setState({
            answers,
            editAnswer: null,
            editQuestion: null,
            questionModal: false,
            editQuestionNo: null,
            sectionId: null
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
            <GridContainer style={{backgroundColor:'#fff9ec'}}>
                <EditQuestionModal
                    handleSave={this.handleQuestionUpdate}
                    questionNo={editQuestionNo}
                    question={editQuestion}
                    answer={editAnswer}
                    open={questionModal}
                    close={()=>this.setState({sectionId:null,editAnswer: null,editQuestion: null,questionModal: false,editQuestionNo: null})}
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


