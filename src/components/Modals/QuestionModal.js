import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {Transition} from "../../Functions";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import {FormControl,InputLabel,Select, MenuItem} from "@material-ui/core";
import {Close, Save} from "@material-ui/icons";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "../CustomButtons/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import CustomInput from "../CustomInput/CustomInput";

class QuestionModal extends React.Component{

    state={
        title:'',
        answer:'',
        type:'text',
        A:'',
        B:'',
        C:'',
        D:'',
        error:null
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.questionData !== this.props.questionData && this.props.questionData){
            const {title, answer,type}=this.props.questionData;
            if(type==='text' || type ==='trueFalse'){
                this.setState({title,answer,type})
            }else{
                const {options}=this.props.questionData;
                this.setState({
                    title,
                    answer,
                    type,
                    A:options.A,
                    B:options.B,
                    C:options.C,
                    D:options.D
                })
            }
        }
    }

    handleSave=()=>{
        const {title,answer,type,A,B,C,D}=this.state;
        let test=false;
        let error=null;

        title!==''?
            answer!==''?
                type==='multiple'?
                    A!==''?
                        B!==''?
                            C!==''?
                                D!==''?
                                    test=true
                                    :error='Please enter D!'
                                :error='Please enter option C!'
                            :error='Please enter option B!'
                        :error='Please enter option A!'
                :test=true
                :error='Please enter answer!'
            :error='Please enter title!';

        if(test){
            const data={title,answer,type,A,B,C,D};
            this.props.onSave(data);
        }else{
           this.setState({error:error})
        }
    };

    handleChange=name=>event=>{
        this.setState({[name]:event.target.value})
    };

    renderQuestionType=(type)=>{
        const {A,B,C,D}=this.state;
        if(type!=='text' && type !=='trueFalse'){
            return (
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                            id={'optionA'}
                            labelText={'Option A'}
                            inputProps={{
                                placeholder:'Option A',
                                type:'text',
                                value:A,
                                onChange:this.handleChange('A')
                            }}
                            formControlProps={{
                                fullWidth:true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                            id={'optionB'}
                            labelText={'Option B'}
                            inputProps={{
                                placeholder:'Option B',
                                type:'text',
                                value:B,
                                onChange:this.handleChange('B')
                            }}
                            formControlProps={{
                                fullWidth:true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                            id={'optionC'}
                            labelText={'Option C'}
                            inputProps={{
                                placeholder:'Option C',
                                type:'text',
                                value:C,
                                onChange:this.handleChange('C')
                            }}
                            formControlProps={{
                                fullWidth:true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                            id={'optionD'}
                            labelText={'Option D'}
                            inputProps={{
                                placeholder:'Option D',
                                type:'text',
                                value:D,
                                onChange:this.handleChange('D')
                            }}
                            formControlProps={{
                                fullWidth:true
                            }}
                        />
                    </GridItem>
                </GridContainer>
            )
        }
    };

    handleClose=()=>{
        this.setState({
            title:'',
            answer:'',
            type:'text',
            A:'',
            B:'',
            C:'',
            D:'',
            error:null
        });

        this.props.close();
    };

    render() {
        const {title, answer,type}=this.state;
        const {open, classes}=this.props;
        return (
            <Dialog
                fullWidth
                maxWidth={'lg'}
                open={open}
                classes={{
                    root: classes.center,
                    paper: classes.modal
                }}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>this.handleClose()}
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
                        onClick={()=>this.handleClose()}
                    >
                        <Close className={classes.modalClose}/>
                    </IconButton>
                    <h4 className={classes.modalTitle}>Question</h4>
                </DialogTitle>
                <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}
                >
                    {/*Content*/}
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                id={'title'}
                                labelText={'Question Title'}
                                inputProps={{
                                    placeholder:'Question title',
                                    type:'text',
                                    value:title,
                                    onChange:this.handleChange('title')
                                }}
                                formControlProps={{
                                    fullWidth:true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                id={'answer'}
                                labelText={'Question Answer'}
                                inputProps={{
                                    placeholder:'Question Answer',
                                    type:'text',
                                    value:answer,
                                    onChange:this.handleChange('answer')
                                }}
                                formControlProps={{
                                    fullWidth:true
                                }}
                            />
                            <p style={{fontSize:12}}>For true or false questions, type the word true or false, for all other questions type answer.</p>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <FormControl style={{minWidth:120}}>
                                <InputLabel id="questionType">Question Type</InputLabel>
                                <Select
                                    labelId="questionType"
                                    id="questionType-id"
                                    value={type}
                                    onChange={this.handleChange('type')}
                                >
                                    <MenuItem value={'text'}>Text</MenuItem>
                                    <MenuItem value='multiple'>Multiple</MenuItem>
                                    <MenuItem value='trueFalse'>True or False</MenuItem>
                                </Select>
                            </FormControl>
                            {this.renderQuestionType(type)}
                        </GridItem>
                    </GridContainer>
                </DialogContent>
                <DialogActions
                    className={classes.modalFooter + " " + classes.modalFooterCenter}
                >
                    <Button round size={'sm'} onClick={()=>this.handleClose()}><Close/>Cancel</Button>
                    <Button color={'success'} round size={'sm'} onClick={()=>this.handleSave()}>
                        <Save/>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        )
    }





};

export default withStyles(modalStyle)(QuestionModal);