import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle,
    DialogContent,DialogContentText,DialogActions } from 'material-ui/Dialog';
import {success,danger} from "../../constant/color";

const styles = {
    title:{
        textAlign:"center"
    }

};

class CancelDialog extends React.Component {
    render() {
        const { classes,open,onClose} = this.props;

        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle className={classes.title} id="simple-dialog-title" color="primary">Cancel Booking</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure to cancel this booking?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} onClick={onClose} style={{color:success}}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} onClick={onClose} style={{color:danger}}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

CancelDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.object.isRequired,

};

export default withStyles(styles)(CancelDialog);