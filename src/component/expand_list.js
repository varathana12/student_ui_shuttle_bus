import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import CancelDialog from './dialog/cancel_dialog'
import QRView from './dialog/qr_view'
import {id_to_name,convert_date_fomart} from "../init";
import {connect} from 'react-redux'
import {student_cancel,get_history} from "../api";
import CancelStatus from './dialog/cancel_status'
import {historyData} from "../actions";
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    button: {
        width:"calc(100% + 24px)",
        border:"1px solid"
    },
    bothButton:{

    },
    cancel:{
        border:"1px solid",
        width:"calc(100% - 10px)"
    },
    qr:{
        border:"1px solid",
        width:"calc(100% + 14px)",
        marginLeft:10
    }
});

class SimpleTable extends React.Component{
    state = {
        cancel_dialog:false,
        qr_view:false,
        id_cancel:0,
        open_status:false,
        status_cancel:false
    }
    cellItems(data){
        const {destination_name,code,source_name,departure_date,driver,bus_model} = data
        console.log(data)
        return [
            {name:'Code', data:code},
            {name:'Source', data:source_name},
            {name:'Destination', data:destination_name},
            {name:'Departure Date', data:convert_date_fomart(departure_date)},
            {name:'Bus Model', data:bus_model?bus_model:"to be decide"},
            {name:'Driver', data:driver?driver:"to be decide"},
        ];
    }
    submitCancel(id){
        student_cancel(id).then(res=>{
            this.setState({open_status:true,status_cancel:res.status})
        })
    }
    onConfirm(){
        const {historyData} = this.props
        get_history().then(res=>{
            historyData(res)
        })
    }

    render() {
        const {classes,data} = this.props;
        const {cancel_dialog,qr_view,id_cancel,open_status,status_cancel} = this.state;
        const {schedule} = data
        return (

            <Table className="table_cl">
                <TableBody>
                    {this.cellItems(data).map((item,index )=> {
                        return (
                            <TableRow key={index}>
                                <TableCell><span style={{fontWeight: "bold"}}>{item.name}</span></TableCell>
                                <TableCell numeric><span
                                    style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>{item.data}
                                </TableCell>

                            </TableRow>
                        );
                    })}
                    {
                        schedule ?
                            <TableRow>
                                <TableCell>
                                    <Button color="secondary"
                                            onClick={()=>this.setState({cancel_dialog:true,id_cancel:data.schedule_id})}
                                            className={classes.cancel} >Cancel</Button>
                                </TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={()=>this.setState({qr_view:true})}
                                            className={classes.qr}>QR Code</Button>
                                </TableCell>
                            </TableRow>
                            :
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <Button color="secondary"
                                            onClick={()=>this.setState({cancel_dialog:true,id_cancel:data.schedule_id})}
                                    className={classes.button}>Cancel</Button>
                                </TableCell>
                            </TableRow>
                    }
                </TableBody>
                <CancelDialog onClose={()=>this.setState({cancel_dialog:false})}
                              open={cancel_dialog} onSubmit={()=>{this.submitCancel(id_cancel)}}/>
                <QRView onClose={()=>this.setState({qr_view:false})} open={qr_view}/>
                <CancelStatus open={open_status}
                              status={status_cancel}
                              Confirm={()=>this.onConfirm()}
                              onClose={()=>this.setState({open_status:false})}/>
            </Table>
        );
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        historyData: data => (dispatch(historyData(data))),
    }
}
const mapStateToProps =state =>{
    return {
        source_data:state.source_data
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SimpleTable));