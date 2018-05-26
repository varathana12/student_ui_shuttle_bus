import React, { Fragment, PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import {selectReturnDate} from "../actions";
import {init_max_date,init_min_return,init_return,date_enable} from "../init";
import {connect} from 'react-redux'
import 'material-design-icons/iconfont/material-icons.css'
class ReturnDate extends PureComponent {

    state={
        init_min_return:"",
        init_max_date:"",
        date_enable:[]

    }
    componentWillMount(){



        init_max_date().then(res=>{
            this.setState({init_max_date:res})
        })
        date_enable().then(res=>{
            this.setState({date_enable:res})
        })
    }

    render() {

        const { return_date,returnDate,departure_date } = this.props;
        const {date_enable,init_max_date} = this.state
        return (
            <Fragment>
                <MuiPickersUtilsProvider utils={MomentUtils} >
                    <DatePicker
                        label="Return Date"
                        value={return_date}
                        onChange={date=>returnDate(date.toDate())}
                        animateYearScrolling={true}
                        autoOk={true}
                        className={"date_picker"}
                        minDateMessage="return should after departure"
                        format={" DD/ MM/ YYYY"}
                        minDate={init_min_return(departure_date)}
                        maxDate={init_max_date}
                        shouldDisableDate={function (date) {
                            for(let item in date_enable){
                                if(date.day() === date_enable[item]){
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
        returnDate: date =>(dispatch(selectReturnDate(date)))
    }
}
const mapStateToProps = state =>{
    return {
        return_date:state.return_date,
        departure_date:state.date,
        isSubmit:state.isSubmit
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReturnDate)