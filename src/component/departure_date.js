import React, { Fragment, PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import {selectDepartureDate, returnDateStatus, enableChoice, tripChoice} from "../actions";

import {min_date_booking,max_date_booking} from "../init/date_fuction";

import {connect} from 'react-redux'
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
        const {departureDate,return_date, returnDateStatus,
            list_final,enableChoice,tripChoice} = this.props

        departureDate(date.toDate())
        returnDateStatus(date.toDate() < return_date.getDate())
        console.log(list_final)
        if(date.toDate().getDay() === list_final[list_final.length -1]){
            //enableChoice(false)
            tripChoice("1")
        }else {
            enableChoice(true)
        }
    }

    render() {
        const { departure_date,today,list_final} = this.props;

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
                            for(var i in list_final){
                                if(date.toDate().getDay() === list_final[i]){
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
        enableChoice:status =>(dispatch(enableChoice(status))),
        tripChoice:choice =>(dispatch(tripChoice(choice))),
    }
}
const mapStateToProps = state =>{
    return {
        departure_date:state.date,
        return_date: state.return_date,
        isSubmit:state.isSubmit,
        today:state.today,
        list_enable:state.list_enable,
        list_final:state.list_final
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DepartureDate)
