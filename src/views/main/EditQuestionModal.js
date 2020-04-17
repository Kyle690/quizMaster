import React from "react";
import {Transition} from "../../Functions";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import {Close} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "../../components/CustomButtons/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import {Checkbox, FormControlLabel, withStyles} from "@material-ui/core";
import CustomInput from "../../components/CustomInput/CustomInput";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";

class EditQuestionModal extends React.Component{

    state={
        answer:'',
        error:null,
        questionNo:null
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        const questionNo = prevProps.questionNo;
        if(questionNo!==this.props.questionNo){
            this.setState({answer:this.props.answer, questionNo:this.props.questionNo})
        }
    }

    renderQuestion=()=>{
        const question = this.props.question;

        if(question){
            // render question type with switch
            const {type, options}=question;
            const answer = this.state.answer;
            switch(type){
                case 'trueFalse':
                    return (
                        <GridContainer>
                            <GridItem xs={6}>
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
                            <GridItem xs={6}>
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
                                <GridItem xs={6} sm={6} md={3} key={option}>
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
        }
    };


    handleSave=()=>{
        const {answer, questionNo} = this.state;
        if(answer !==''){
            this.props.handleSave(answer, questionNo);
        }else{
            this.setState({error:'Please enter an answer!'})
        }
    };

    handleChange=name=>event=>{
      this.setState({error:null,[name]:event.target.value})
    };
    render(){
        const {open, close, classes}=this.props;
        return (
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={open}
                classes={{
                    root: classes.center,
                    paper: classes.modal
                }}
                TransitionComponent={Transition}
                keepMounted
                onClose={close}
                aria-labelledby="modal-slide-title"
                aria-describedby="modal-slide-description"
            >
                <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={close}
                    >
                        <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle}>Edit Answer</h4>
                </DialogTitle>
                <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}
                >
                    <div>
                        <h4>Question No <strong>{parseInt(this.state.questionNo)+1}</strong></h4>
                        {this.renderQuestion()}
                    </div>
                </DialogContent>
                <DialogActions
                    className={classes.modalFooter + " " + classes.modalFooterCenter}
                >
                    <Button round size={'sm'} onClick={close}>Cancel</Button>
                    <Button color={'success'} round size={'sm'} onClick={()=>this.handleSave()}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default withStyles(modalStyle)(EditQuestionModal);