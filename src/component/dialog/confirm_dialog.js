import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle,
    DialogContent,DialogActions } from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import {connect} from 'react-redux'
import {success,danger} from "../../constant/color";
import {id_to_name} from "../../init/index";

const styles = theme => ({
    last_cell:{
        paddingRight:0
    },
    title:{
      textAlign:"center"
    },
    okButton:{
        border:"1px solid",
        width:"40%",
        color:success
    },
    cancelButton:{
        border:"1px solid",
        width:"40%",
        float:"left",
        color:danger
    },
    dialogAction:{
        justifyContent:"space-between",
        margin:"0 18px",
        marginBottom:18
    }

});

class ConfirmDialog extends React.Component {


    render() {
        const { open,onClose,confirm,source_data,booking_data,classes} = this.props;
        const {destination,source,departure_date,return_date,choice} = booking_data
        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title"  className={classes.title}>Booking Confirm</DialogTitle>
                <DialogContent>
                    <Table className="table_cl table_dl" style={{width:window.outerWidth -110,maxWidth:490}}>
                        <TableBody>
                            <TableRow>
                                <TableCell>{"Source"}</TableCell>
                                <TableCell>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {id_to_name(source_data,source)}
                                    </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Destination"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {id_to_name(source_data,destination)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{"Trip"}</TableCell>
                                <TableCell>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {choice === 1 ? "One Way":"Round Way"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{"Departure Date"}</TableCell>
                                <TableCell>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {departure_date.toLocaleString().split(", ")[0]}</TableCell>
                            </TableRow>
                            {
                                choice === 2?
                                    <TableRow>
                                        <TableCell>{"Return Date"}</TableCell>
                                        <TableCell>
                                            <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                            {return_date.toLocaleString().split(", ")[0]}</TableCell>
                                    </TableRow>
                                    :<dive></dive>
                            }

                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions className={classes.dialogAction}>
                    <Button onClick={onClose} className={classes.cancelButton}>
                        Cancel
                    </Button>
                    <Button onClick={()=>{onClose();confirm()}} className={classes.okButton}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.object.isRequired,

};
const mapStateToProps = state =>{
    return {
        source_data:state.source_data,
        booking_data: {source:state.source,
            destination:state.destination,
            departure_date:state.date,
            return_date:state.return_date,
            choice: Number(state.choice),
        },
    }
}


export default connect(mapStateToProps)(withStyles(styles)(ConfirmDialog));