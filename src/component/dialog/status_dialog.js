import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle,
    DialogContent,DialogContentText,DialogActions } from 'material-ui/Dialog';
import ErrorIcon from 'material-ui-icons/Error'
import SuccessIcon from 'material-ui-icons/CheckCircle'
import {success,danger,view} from "../../constant/color";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {chageTitleHeader,historyData} from "../../actions";
import {get_history} from "../../api";
import {PREFIX} from "../../constant/variable";
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
        float:"left",
        width:"40%",
        border:"1px solid",
    },
    viewButton:{
        float:"right",
        width:"40%",
        border:"1px solid"
    }

};
class StatusDialog extends React.Component {

    onView(){
        const {historyData,history,title} = this.props
        /*get_history().then(res=>{
            historyData(res)
            history.push(PREFIX+'/student/History');
            title('History')

        })*/
        window.location.href = PREFIX+'/student/History'
    }

    render() {
        const { classes,open,onClose,history,title,status} = this.props;
        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title" color={status?success:danger}  className={classes.title}>
                    {status?"Successful Booking ":"Failed Booking"}</DialogTitle>
                <DialogContent className={classes.content}>
                    <DialogContentText>
                    {status?<SuccessIcon style={{ fontSize: 150,color:success }}/>:<ErrorIcon style={{ fontSize: 150,color:danger }}/>}
                    </DialogContentText>
                </DialogContent>
                <DialogContent className={classes.content}>
                    <DialogContentText>
                        {status?"Successfully Booking! Please Enjoy Your Trip."
                            :"Sorry! Please check Internet connection and book again."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={"status_action"}>
                    {status?
                        <span>
                            <Button className={classes.okButton}
                                    onClick={()=>{onClose();window.location.reload()}} style={{color:success}}>
                                OK
                            </Button>
                            <Button className={classes.viewButton} onClick={()=>{this.onView()}} style={{color:view}} >
                                View
                            </Button>
                        </span>
                        :<Button className={classes.onLyOkButton} fullWidth={true} onClick={onClose} style={{color:success}}>
                            OK
                        </Button>
                    }

                </DialogActions>
            </Dialog>
        );
    }
}
StatusDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
    return {
        title:title=>(dispatch(chageTitleHeader(title))),
        historyData:data=>(dispatch(historyData(data)))


    }
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(withRouter(StatusDialog)));
