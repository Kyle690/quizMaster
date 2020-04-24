import React from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from '../../components/CustomButtons/Button';
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import CustomInput from "../../components/CustomInput/CustomInput";
import {FormControlLabel,Checkbox} from "@material-ui/core";
import Danger from "../../components/Typography/Danger";

class QuestionComponent extends React.Component{

    state={
      answer:'',
      error:null
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const answer = this.props.answer;
        if(answer && this.state.answer===''){
            this.setState({answer});
        }
        else if(prevProps.question !==this.props.question){
            this.setState({answer:''});
        }
    };

    componentWillUnmount() {
        this.setState({answer:'',error:null});
    }

    renderQuestion=()=>{
        const {type, options}=this.props.question;
        const answer = this.state.answer;
        switch(type){
            case 'trueFalse':
                return (
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={answer==='true'}
                                        onChange={this.handleChange('answer')}
                                        name={'true'}
                                        color="primary"
                                        value={'true'}
                                    />
                                }
                                label={'True'}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={answer==='false'}
                                        onChange={this.handleChange('answer')}
                                        name={'false'}
                                        color="primary"
                                        value={'false'}
                                    />
                                }
                                label={'false'}
                            />
                        </GridItem>
                    </GridContainer>
                )
                ;
            case'multiple':
                return (
                    <GridContainer>
                        {Object.keys(options).map(option=>(
                            <GridItem xs={12} sm={6} md={3} key={option}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={options[option]===answer}
                                            onChange={this.handleChange('answer')}
                                            name={option}
                                            color="primary"
                                            value={options[option]}
                                        />
                                    }
                                    label={options[option]}
                                />
                            </GridItem>
                        ))}
                    </GridContainer>
                );
            default:
                return (
                    <div>
                        <CustomInput
                            id={'answer'}
                            inputProps={{
                                value:answer,
                                placeholder:'Your answer here',
                                onChange:this.handleChange('answer')
                            }}
                            formControlProps={{
                                fullWidth:true
                            }}
                        />
                    </div>

                )
        }
    };

    handlePrevious=()=>{
        const answer =this.state.answer;
        if(answer && answer!==''){
            this.setState({answer: ''});
            this.props.move(answer, 'previous')
        }else{
            this.setState({error:'Please add an answer, you can changed this at a later stage'});
        }
    };

    handleNext=()=>{
        const answer =this.state.answer;
        if(answer && answer !==''){
            this.setState({answer: ''});
            this.props.move(answer, 'next');
        }else{
            this.setState({error:'Please add an answer, you can changed this at a later stage'})
        }
    };

    handleChange=(name)=>event=>{
        this.setState({error:null,[name]:event.target.value})
    };

    render(){
        return (
            <GridContainer justify={'center'}>
                <GridItem xs={12}>
                    <h4>Question   <strong>{this.props.questionNo}</strong></h4>
                    <div style={{paddingTop:'5%', paddingBottom:'10%'}}>
                        {this.renderQuestion()}
                        <Danger>{this.state.error}</Danger>
                    </div>
                </GridItem>
                <GridItem xs={6} container justify={'flex-end'}>
                    <Button onClick={()=>this.handlePrevious()} color={'warning'} size={'sm'} round >
                        <ChevronLeft/>
                        Previous
                    </Button>
                </GridItem>
                <GridItem xs={6}>
                    <Button onClick={()=>this.handleNext()} color={'warning'} size={'sm'} round >
                        <ChevronRight/>
                        Next
                    </Button>
                </GridItem>
            </GridContainer>
        )
    }
}

export default QuestionComponent;
