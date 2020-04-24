import React from "react";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import Button from "../../../../components/CustomButtons/Button";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";

class ViewSection extends React.Component{

    state={
        questionNo:0,
        questions:null,
        keys:null
    }
    componentDidMount() {
        if(this.props.questions){
            this.setState({
                questions:this.props.questions,
                keys:Object.keys(this.props.questions),
                questionNo:0
            })
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.questions !== this.props.questions){
            if(this.props.questions){
                this.setState({
                    questions:this.props.questions,
                    keys:Object.keys(this.props.questions),
                    questionNo:0
                })
            }
        }
    }


    renderQuestion=()=> {

        const {questions, questionNo, keys} = this.state;
        if(questions) {
            const {title, type, options} = questions[keys[questionNo]];

            return (
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <h3>Question No {questionNo + 1}/{keys.length}</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} container justify={'center'}
                              style={{paddingTop: 50, paddingBottom: 15}}>
                        <h3>{title}</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} container justify={'center'} style={{paddingBottom: 40}}>
                        {type === 'multiple' ?
                            <GridContainer>
                                {Object.keys(options).map(key => (
                                    <GridItem key={key} xs={6}>
                                        {key} - {options[key]}
                                    </GridItem>
                                ))}
                            </GridContainer>
                            : <h6>Question Type: {type === 'trueFalse' ? 'True or false' : 'Text input'}</h6>
                        }
                    </GridItem>
                    <GridItem xs={6} container justify={'flex-end'}>
                        <Button onClick={()=>this.handlePrevious()} color={'warning'} size={'sm'}
                                round>
                            <ChevronLeft/>
                            Previous
                        </Button>
                    </GridItem>
                    <GridItem xs={6}>
                        <Button onClick={()=>this.handleNext()} color={'warning'}
                                size={'sm'} round>
                            <ChevronRight/>
                            Next
                        </Button>
                    </GridItem>
                </GridContainer>
            )
        }
    }


    handleNext=()=>{
            const {questions, questionNo, keys}=this.state;
            if(questionNo+1>=keys.length){
                // move to next sections
                this.props.handleMove('next')
            }else{
                this.setState({questionNo:questionNo+1})
            }
    }

    handlePrevious=()=>{
        const {questions, questionNo, keys}=this.state;
        if(questionNo-1<0){
            // move to previous sections
            this.props.handleMove('previous');
        }else{
            this.setState({questionNo: questionNo-1})
        }
    }


    render(){
        return (
            <div>
                {this.renderQuestion()}
            </div>

        )
    }
}
export default ViewSection;