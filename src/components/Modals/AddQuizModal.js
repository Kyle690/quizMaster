import React from "react";
import {Transition} from "../../Functions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import {Close} from '@material-ui/icons'
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Button from "../CustomButtons/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import withStyles from "@material-ui/core/styles/withStyles";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import {reduxForm, Field} from "redux-form";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import {RenderInput} from "../../Functions/RenderInput";
import DateTimePicker from "../DateTimePicker";



const AddQuizModal=({open, close,onSubmit, classes, handleSubmit, date, handleDateChange})=>{
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog
                fullWidth
                maxWidth={'md'}
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
                    <h4 className={classes.modalTitle}>Create New Quiz</h4>
                </DialogTitle>
                <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}
                >
                    <GridContainer style={{minHeight:200}}>
                        <GridItem xs={12} sm={12} md={8}>
                            <Field
                                id={'title'}
                                width
                                type={'text'}
                                name={'title'}
                                placeholder={'quiz name'}
                                label={'Quiz title'}
                                component={RenderInput}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <DateTimePicker
                                value={date}
                                onChange={handleDateChange}
                            />
                        </GridItem>
                    </GridContainer>
                </DialogContent>
                <DialogActions
                    className={classes.modalFooter + " " + classes.modalFooterCenter}
                >
                    <Button type={'button'} round size={'sm'} onClick={close}>Cancel</Button>
                    <Button type={'submit'} color={'success'} round size={'sm'} onClick={handleSubmit(onSubmit)} >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    )
};
const validate=(formValues)=>{
  const errors={};
  const {title}=formValues;

  if(!title){
      errors.title='Please enter a title'
  }
  return errors;
};

const Form=reduxForm({
    form:'createQuiz',
    validate
})(AddQuizModal);


export default withStyles(modalStyle)(Form);