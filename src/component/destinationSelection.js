import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl,FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import {selectDestination} from "../actions";
import {connect} from 'react-redux'
import {student_info} from "../api";
import './style.css'

class Destination extends React.Component {
    state = {
        destination: '',
        open: false,
    };

    handleChange = event => {
        const {selectDestination} = this.props
        const {name,value} = event.target
        this.setState({ [name]:value });
        selectDestination(value)

    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    componentWillMount(){
        const {destination} = this.props
        this.setState({destination,required:destination ? false : true})
    }
    componentDidMount(){

    }


    render() {
        const { classes,isSubmit,destinationData,destination } = this.props;
        return (
                <FormControl className={classes.formControl} error={!destination && isSubmit}>
                    <InputLabel htmlFor="destination">Destination</InputLabel>
                    <Select
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.destination}
                        onChange={this.handleChange}
                        className={classes.Select}
                        inputProps={{
                            name: 'destination',
                            id: 'destination',
                        }}
                    >
                        {destinationData.map(item=>(<MenuItem key={item.location_id} value={item.location_id}>{item.location_name}</MenuItem>))}
                    </Select>
                    {
                        !destination && isSubmit?<FormHelperText>*required</FormHelperText>:<span></span>
                    }
                </FormControl>
        );
    }
}
const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 5,
    },
    formControl: {
        minWidth: "100%",
        marginBottom:20
    },
    Select:{
        lineHeight:"2.5rem"
    }
});
const mapDispatchToProps = dispatch =>{
    return {
        selectDestination: destination =>(dispatch(selectDestination(destination)))

    }
}
const mapStateToProps = state =>{
    return {
        destination:state.destination,
        isSubmit:state.isSubmit,
        destinationData:state.destination_data
    }
}
Destination.propTypes = {
    classes: PropTypes.object.isRequired,
};
const  DestinationSelect = connect(mapStateToProps,mapDispatchToProps)
(withStyles(styles)(Destination))
export default DestinationSelect

