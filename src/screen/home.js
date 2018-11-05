import React from 'react';
import '../component/style.css'
import moment from 'moment'
import {PrimaryButton,SourceSelect,DestinationSelect,
    CircularIndeterminate,RadioButtonsGroup} from '../root'
import ConfirmDialog from '../component/dialog/confirm_dialog'
import StatusDialog from '../component/dialog/status_dialog'
import Layout from './layout'
import {connect} from 'react-redux'
import {
    submitBooking, sourceData, resetState,
    chageTitleHeader, listDateDisable, toDay, listEnable,
    selectDepartureDate, selectReturnDate, tripChoice,
    listFinal, enableChoice,
    destinationData,
    remainingTicketState,
    disabledButton,
    returnDateStatus

} from "../actions";
import {source_data_api,submit_booking,list_disable_date,
    today_api,list_enable_api,remainingTicket} from "../api";
import DepartureDate from '../component/departure_date'
import ReturnDate from '../component/return_date'
import {withRouter} from 'react-router-dom'
import {success} from "../constant/color";
import {PREFIX} from "../constant/variable";
import {list_booked, list_enable_method,
    init_date_booking, init_return_booking,add_date, max_date_booking} from "../init/date_fuction";

class Home extends React.Component {

    state={
        loading_submit:false,
        style:{},
        confirm_dialog:false,
        isConfirm:false,
        status_booking:false,
        open_status:false,
        two_disable:false,
        disable_button:false,
        loading_date:true
    }

    onSubmit(){
        const {booking_data,submitBooking,return_date_status} = this.props;
        const {source, destination,departure_date,return_date,choice } = booking_data;
        if(source && destination && departure_date){
            if(choice === 2){
                if(return_date&&return_date_status){
                    this.setState({confirm_dialog:true})
                }
            }else{
                this.setState({confirm_dialog:true})
            }
        }
        else{
        }
        submitBooking(true)
    }
    componentDidMount(){

        const {source,dateDisable,source_data,
            toDay,listEnable,list_enable,departureDate,
            returnDate,tripChoice,listFinal,enableChoice,destinationData,
            remainingTicketState,remaining_ticket,disabledButton,returnDateStatus} = this.props;
        if(!remaining_ticket){
            remainingTicket().then(res=>{
                if(res.ticket === 1){
                    tripChoice("1")
                    enableChoice(false)
                    this.setState({two_disable:true})
                }
                remainingTicketState(res.ticket)
            })
        }
        if(source_data.length === 0){
            source_data_api().then(data=>{
                source(data)
                destinationData(data)
            })
        }

        today_api().then(today=>{
            toDay(today)

            list_disable_date().then(list_disabled=>{

                dateDisable(list_disabled)
                if(list_enable.length === 0){
                    list_enable_api().then(res=>{
                        this.setState({loading_date:false})
                        listEnable(res)
                        let list = list_enable_method(res,list_booked(list_disabled));
                        console.log(list[list.length-1])
                        if(list[list.length-1] === 10){
                            disabledButton(true)
                        }

                        listFinal(list)
                        if(list.length === 1){
                            tripChoice("1")
                            enableChoice(false)
                            this.setState({two_disable:true})
                            departureDate(init_date_booking(today,list))
                            returnDate(init_return_booking(init_date_booking(today,list),list))
                        }else if(list.length === 0){
                            disabledButton(true)
                            departureDate(add_date(2))
                            returnDate(add_date(4))
                        }else {
                            var init_return = init_return_booking(init_date_booking(today,list),list)
                            departureDate(init_date_booking(today,list))
                            var max_date = max_date_booking(today)
                            console.log(moment(max_date).toDate().getDate())
                            console.log(moment(init_return).toDate().getDate())
                            console.log(moment(max_date).toDate().getDate() < moment(init_return).toDate().getDate())
                            if(moment(max_date).toDate().getDate() < moment(init_return).toDate().getDate()){
                                returnDateStatus(false)
                                tripChoice("1")
                            }
                            returnDate(init_return);

                        }

                    })
                }else{
                    let list = list_enable_method(list_enable,list_booked(list_disabled));
                    departureDate(init_date_booking(today,list))
                    returnDate(init_return_booking(init_date_booking(today,list),list))
                    this.setState({loading_date:false})
                }
            })
        })
    }

    submitData(booking_data){
        const {remainingTicketState} = this.props
        var dep = booking_data.departure_date
        var re = booking_data.return_date
        booking_data.departure_date = dep.getFullYear()+"-"+(dep.getMonth()+1)+"-"+dep.getDate()
        booking_data.return_date = re.getFullYear()+"-"+(re.getMonth()+1)+"-"+re.getDate()
        this.setState({loading_submit:true, style:{opacity:0.4, pointerEvents:"none"}})
        submit_booking(booking_data).then(res =>{

            remainingTicket().then(res=>{
                remainingTicketState(res.ticket)
            })
            this.setState({loading_submit:false,style:{}})
            this.setState({open_status:true,status_booking:res.status})
        }).catch((e)=> {

                this.setState({loading_submit:false,style:{}})
                this.setState({open_status:true,status_booking:false})


        })
    }

    render() {
        const {loading_submit,confirm_dialog,
            status_booking,open_status,two_disable,loading_date} = this.state
        const {booking_data,remaining_ticket,disabled_button} = this.props
        const {choice} = booking_data
        return (
           <Layout>
                <span>
                    <div hidden={!loading_submit}><CircularIndeterminate /></div>

                    <div style={this.state.style}>
                    <div style={{textAlign:"center"}}>
                        <h2 style={styles.header}></h2>
                    </div>
                    <form autoComplete="off">
                        <SourceSelect/>
                        <DestinationSelect/>
                        <RadioButtonsGroup two_disable={two_disable||(remaining_ticket === 1)}/>
                        <DepartureDate/>

                        {choice === 2 ? <ReturnDate/> :<div></div>}
                        <PrimaryButton  onSubmit={this.onSubmit.bind(this)}
                                        disable={(disabled_button||!remaining_ticket)||loading_date}/>


                        <ConfirmDialog
                            onClose={()=>this.setState({confirm_dialog:false})}
                            open={confirm_dialog}
                            confirm={()=>this.submitData(booking_data)}
                            booking_data={booking_data}
                        />
                        <StatusDialog open={open_status}
                                      status={status_booking}
                                      onClose={()=>this.setState({open_status:false})}/>
                    </form>
                </div>
                </span>
            </Layout>
        );
    }
}
var styles ={
    header:{
        color:success,
        marginAfter:0
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitBooking: status => (dispatch(submitBooking(status))),
        source: data =>(dispatch(sourceData(data))),
        reset:()=>(dispatch(resetState())),
        title:title=>(dispatch(chageTitleHeader(title))),
        dateDisable:data=>(dispatch(listDateDisable(data))),
        toDay:date=>(dispatch(toDay(date))),
        listEnable:list=>(dispatch(listEnable(list))),
        departureDate: date =>(dispatch(selectDepartureDate(date))),
        returnDate: date =>(dispatch(selectReturnDate(date))),
        tripChoice:choice =>(dispatch(tripChoice(choice))),
        listFinal:list =>(dispatch(listFinal(list))),
        enableChoice:status =>(dispatch(enableChoice(status))),
        destinationData:data=>(dispatch(destinationData(data))),
        remainingTicketState:ticket=>(dispatch(remainingTicketState(ticket))),
        disabledButton:status=>(dispatch(disabledButton(status))),
        returnDateStatus: status =>(dispatch(returnDateStatus(status))),
    }
}
const mapStateToProps =state =>{
    return {
            booking_data: {source:state.source,
                destination:state.destination,
                departure_date:state.date,
                return_date:state.return_date,
                choice: Number(state.choice),
            },
            return_date_status:state.return_date_status,
            source_data:state.source_data,
            today:state.today,
            list_enable:state.list_enable,
            remaining_ticket:state.remaining_ticket,
            disabled_button:state.disabled_button
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Home));
