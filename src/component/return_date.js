import React, { Fragment, PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import {returnDateStatus, selectReturnDate, tripChoice} from "../actions";

import {max_date_booking, min_date_booking} from "../init/date_fuction";
import {connect} from 'react-redux'
class ReturnDate extends PureComponent {
    state={
        init_min_return:"",
        init_max_date:"",
        date_enable:[],
        list_date_booked:[]

    }
    onChange(date){
        const {returnDate,departure_date,returnDateStatus} = this.props
            returnDateStatus(date > departure_date)
        console.log(date)
        console.log(date > departure_date)
            returnDate(date)
    }

    render() {
        const { return_date,departure_date,today,list_final } = this.props;
        console.log("max:"+max_date_booking(today))
        return (
            <Fragment>
                <MuiPickersUtilsProvider utils={MomentUtils} >
                    <DatePicker
                        label="Return Date"
                        value={return_date}
                        onChange={date=>this.onChange(date.toDate())}
                        animateYearScrolling={true}
                        autoOk={true}
                        className={"date_picker"}
                        minDateMessage="return should after departure"
                        format={" DD/ MM/ YYYY"}
                        minDate={min_date_booking(departure_date,true)}
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
        returnDate: date =>(dispatch(selectReturnDate(date))),
        tripChoice:choice =>(dispatch(tripChoice(choice))),
        returnDateStatus: status =>(dispatch(returnDateStatus(status))),
    }
}
const mapStateToProps = state =>{
    return {
        return_date:state.return_date,
        departure_date:state.date,
        isSubmit:state.isSubmit,
        today:state.today,
        list_enable:state.list_enable,
        list_final:state.list_final
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReturnDate)
