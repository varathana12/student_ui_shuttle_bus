import React, { Fragment, PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import {selectDepartureDate,returnDateStatus,listDateDisable} from "../actions";
import {init_min_date,init_max_date,loop_date,
    date_enable,init_date} from "../init";
import {list_enable_method,list_booked,
    min_date_booking,max_date_booking} from "../init/date_fuction";
import {list_disable_date} from '../api'
import {connect} from 'react-redux'
import 'material-design-icons/iconfont/material-icons.css'
class DepartureDate extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            enable_date:[],
            init_max_date:"",
            init_min_date:"",
            list_date_booked:[]
        }
    }
    changeDepartureDate(date){
        const {departureDate,return_date, returnDateStatus} = this.props
        departureDate(date.toDate())
        returnDateStatus(date < return_date)
    }
    componentWillMount(){
        const {departureDate} = this.props
        init_date().then(res=>{
            departureDate((new Date(res)))
        })
        init_max_date().then(res=>{
            this.setState({init_max_date:res})
        })
        date_enable().then(res=>{
            this.setState({enable_date:res})
        })
        list_disable_date().then(res=>{
            this.setState({list_date_booked:res})
        })

    }
    render() {
        const { departure_date,today,list_enable} = this.props;
        const {list_date_booked} = this.state
        const list = list_enable_method(list_enable,list_booked(list_date_booked));
        return (
            <Fragment>
                    <MuiPickersUtilsProvider utils={MomentUtils} >
                    <DatePicker
                        label="Departure Date"
                        value={departure_date}
                        onChange={(date)=>this.changeDepartureDate(date)}
                        animateYearScrolling={true}
                        autoOk={true}
                        className={"date_picker"}
                        format={"DD/ MM/ YYYY"}
                        minDate={min_date_booking(today)}
                        maxDate={max_date_booking(today)}
                        shouldDisableDate={function (date) {
                            for(var i in list){
                                if(date.toDate().getDay() === list[i]){
                                    return false
                                }
                            }
                            return true
                        }}
                    />
                    </MuiPickersUtilsProvider>
            </Fragment>
        );
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        departureDate: date =>(dispatch(selectDepartureDate(date))),
        returnDateStatus: status =>(dispatch(returnDateStatus(status))),
    }
}
const mapStateToProps = state =>{
    return {
        departure_date:state.date,
        return_date: state.return_date,
        isSubmit:state.isSubmit,
        today:state.today,
        list_enable:state.list_enable
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DepartureDate)