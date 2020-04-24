import React from "react";
import QuestionComponent from "./QuestionComponent";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";

class SectionComponent extends React.Component{

    state={
        questionNo:0,
        questions:null,
        answers:{},
        currentQuestion:null,
        questionKeys:[],
        sectionName:'',
    }
    componentDidMount() {
        this.resetState(this.props.sectionData);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.sectionData!==this.props.sectionData){
            this.resetState(this.props.sectionData);
        }
    }

    resetState=(sectionData)=>{
        const {questions,title}=sectionData;
        const questionKeys=Object.keys(questions);
        this.setState({
            questions,
            sectionName:title,
            questionKeys,
            currentQuestion:questions[questionKeys[0]],
            questionNo:0,
            answers:{}
        })
    }

    renderQuestion=()=>{
        const {questionNo,answers,questions,questionKeys}=this.state;
        return (
            <QuestionComponent
                questionNo={questionNo+1+'/'+questionKeys.length}
                answer={answers[questionNo]?answers[questionNo]:null}
                question={questions[questionKeys[questionNo]]}
                move={this.handleMove}
            />
        )
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
                // end of questions got to next section
                this.props.onMove(answers,'next');
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

    render(){
        const {sectionName, questions}=this.state;
        return (
            <GridContainer>
                <GridItem>
                    <h5>Current Section: {sectionName}</h5>
                </GridItem>
                <GridItem>
                    {questions?this.renderQuestion():null}
                </GridItem>
            </GridContainer>
        )
    }
}
export default SectionComponent;