import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import {Transition} from "../../Functions/index";
import Button from "../CustomButtons/Button";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";

const ConfirmModal=({open, close, Title, classes, saveText,saveColor, saveAction, content})=>{

    return (
        <Dialog
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
                <h4 className={classes.modalTitle}>{Title!==undefined?Title:'Confirm Action'}</h4>
            </DialogTitle>
            <DialogContent
                id="modal-slide-description"
                className={classes.modalBody}
            >
                {content}
            </DialogContent>
            <DialogActions
                className={classes.modalFooter + " " + classes.modalFooterCenter}
            >
                <Button round size={'sm'} onClick={close}>Cancel</Button>
                <Button color={saveColor!==undefined?saveColor:'success'} round size={'sm'} onClick={saveAction}>
                    {saveText!==undefined?saveText:'Save'}
                </Button>
            </DialogActions>
        </Dialog>

    )





};

export default withStyles(modalStyle)(ConfirmModal);