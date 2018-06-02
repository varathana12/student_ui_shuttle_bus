import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle,
    DialogContent,DialogContentText,DialogActions } from 'material-ui/Dialog';
import ErrorIcon from '@material-ui/icons/Error'
import SuccessIcon from '@material-ui/icons/CheckCircle'
import {success,danger,view} from "../../constant/color";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {chageTitleHeader} from "../../actions";
const styles = {
    content:{
        textAlign:"center"
    },
    title:{
        textAlign:"center",
        color:"gray"
    },
    dialogAction:{
        width:"100%",
        margin:"0 20px"
    },
    onLyOkButton:{
        border:"1px solid",
    },
    okButton:{
        border:"1px solid",
    },
    viewButton:{
        float:"right",
        width:"40%",
        border:"1px solid"
    }

};
class CancelStatus extends React.Component {
    render() {
        const { classes,open,onClose,status,Confirm} = this.props;
        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title" color={status?success:danger}  className={classes.title}>
                    {status?"Successful Cancel Booking ":"Failed Cancel Booking"}</DialogTitle>
                <DialogContent className={classes.content}>
                    <DialogContentText>
                        {status?<SuccessIcon style={{ fontSize: 150,color:success }}/>:
                            <ErrorIcon style={{ fontSize: 150,color:danger }}/>}
                    </DialogContentText>
                </DialogContent>
                <DialogContent className={classes.content}>
                    <DialogContentText>
                        {status?"Successfully Cancel Booking !"
                            :"Sorry! Please check Internet connection and book again."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={"status_action"}>
                    {status?

                            <Button className={classes.okButton} fullWidth={true}
                                    onClick={()=>{onClose();Confirm()}} style={{color:success}}>
                                OK
                            </Button>

                        :<Button className={classes.onLyOkButton} fullWidth={true} onClick={onClose} style={{color:success}}>
                            OK
                        </Button>
                    }

                </DialogActions>
            </Dialog>
        );
    }
}
CancelStatus.propTypes = {
    classes: PropTypes.object.isRequired,

};
const mapDispatchToProps = dispatch => {
    return {
        title:title=>(dispatch(chageTitleHeader(title))),

    }
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(withRouter(CancelStatus)));