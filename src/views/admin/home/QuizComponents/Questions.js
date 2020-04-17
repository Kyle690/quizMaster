import React from "react";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import Button from '../../../../components/CustomButtons/Button';
import {Add, Close, Edit} from "@material-ui/icons";
import QuestionModal from "../../../../components/Modals/QuestionModal";
import {Tooltip} from "@material-ui/core";
import Table from '../../../../components/Table/Table';
import ConfirmModal from "../../../../components/Modals/ConfrimModal";
class Questions extends React.Component{

    state={
      questionModal:false,
        questionData:null,
        questionId:null,
        deleteModal:false
    };

    componentDidMount() {
        if(this.props.questions){
            this.setState({questions:this.props.questions});
        }
    }

    handleQuestionSave=(data)=>{
        const id = this.state.questionId;
        this.setState({questionModal:false,questionData: null, questionId:null});
        this.props.onSave(data, id);
    };

    handleConfirmDetete=()=>{
      const id = this.state.questionId;
      this.setState({questionId:null,deleteModal:false});
      this.props.onDelete(id);
    };



    renderQuestions=(questions)=>{

        if(questions){

            const keys = Object.keys(questions);
            const tableData = keys.reduce((a,v,i)=>{

                const {title,type} = questions[v];
                a.push([
                    i+1,title,type,
                    <div>
                        <Tooltip title={'Delete Question'}>
                            <Button onClick={()=>this.setState({deleteModal:true,questionId:v})} size={'sm'} color={'danger'} justIcon round><Close/></Button>
                        </Tooltip>
                        <Tooltip title={'Edit Question'}>
                            <Button onClick={()=>this.setState({questionModal:true,questionData:questions[v],questionId:[v]})} color={'info'} round size={'sm'} justIcon><Edit/></Button>
                        </Tooltip>
                    </div>
                ]);

                return a;
            },[]);

            const tableHead=['No','Title','Type','Actions'];

            return (
                <Table
                    tableHeaderColor={'warning'}
                    tableHead={tableHead}
                    tableData={tableData}
                />
            )
        }else{
            return (
                <div>
                    <h5>No Questions yet!</h5>
                </div>
            )
        }


    };

    render(){
        const {questionModal, questionData, deleteModal}=this.state;
        const {classes, questions}=this.props;
        return (
            <GridContainer>
                <QuestionModal
                    onSave={this.handleQuestionSave}
                    classes={classes}
                    open={questionModal}
                    close={()=>this.setState({questionModal: false, questionData: null, questionId:null})}
                    questionData={questionData}
                />
                <ConfirmModal
                    open={deleteModal}
                    close={()=>this.setState({questionId:null, deleteModal:false})}
                    Title={'Confirm Question Delete'}
                    saveText={'Delete'}
                    saveColor={'danger'}
                    saveAction={this.handleConfirmDetete}
                    content={'Are you sure you want to delete this question?'}
                />
                <GridItem container justify={'flex-end'} alignItem={'center'}>
                    <Button size={'sm'} simple color={'warning'} onClick={()=>this.setState({questionModal: true})}>
                        <Add/>
                        Add Question
                    </Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} >
                    {this.renderQuestions(questions)}
                </GridItem>
            </GridContainer>
        )
    }
}

export default Questions;