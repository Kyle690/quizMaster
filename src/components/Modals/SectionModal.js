import React, {useState, useEffect} from 'react';
import {Transition} from "../../Functions";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "../CustomButtons/Button";
import Dialog from "@material-ui/core/Dialog";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import {withStyles} from "@material-ui/core";
import CustomInput from "../CustomInput/CustomInput";

const SectionModal=({open, close, onSave, classes, title})=>{

    const [input, updateInput]=useState('')

    useEffect(()=>{
        updateInput(title)
    },[title])

    const handleSave=()=>{
        if(input!==''){
            onSave(input);

            updateInput('');
        }else{
            alert('Title cannot be blank!')
        }
    }

    const onChange=(name)=>event=>{
        updateInput(event.target.value);
    }

    const handleClose=()=>{
        updateInput('');
        close();
    }

    return (
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
            onClose={()=>handleClose()}
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
                <h4 className={classes.modalTitle}>Section Details</h4>
            </DialogTitle>
            <DialogContent
                id="modal-slide-description"
                className={classes.modalBody}
            >
                <CustomInput
                    labelText={'Section Title'}
                    inputProps={{
                        value:input,
                        placeholder:'Section 1',
                        onChange:onChange('title')
                    }}
                    formControlProps={{
                        fullWidth:true
                    }}
                />
            </DialogContent>
            <DialogActions
                className={classes.modalFooter + " " + classes.modalFooterCenter}
            >
                <Button round size={'sm'} onClick={()=>handleClose()}>Cancel</Button>
                <Button color={'success'} round size={'sm'} onClick={()=>handleSave()}>
                   Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(modalStyle)(SectionModal)