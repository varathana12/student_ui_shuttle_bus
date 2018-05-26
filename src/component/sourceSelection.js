import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl,FormHelperText} from 'material-ui/Form';
import Select from 'material-ui/Select';
import {connect} from 'react-redux'
import {selectSource, destinationData, selectDestination} from "../actions";
import {deleteElementLocation} from "../init/aditional";
import './style.css'



class Source extends React.Component {
    state = {

        source: '',
        open: false,
        required:true,
        isSubmit:false
    };
    constructor(props){
        super(props)
    }

    handleChange = event => {
        const {selectSource,source_data,destinationData,destination,selectDestination} = this.props
        const {value,name} = event.target
        this.setState({ [name]: value });
        selectSource(value)
        if(value===destination){
            selectDestination(0)
        }
        destinationData(deleteElementLocation(source_data,value))

        this.setState({required:value? false : true})
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    
    componentWillMount(){
        const {source} = this.props

        this.setState({source,required: source ? false :true});
    }


    render() {
        const { classes,isSubmit,source_data} = this.props;
        const {required} = this.state;

        const renderItem = source_data.map((item)=>{


                return (<MenuItem key={item.location_id} value={item.location_id}>

                    {item.location_name}
                </MenuItem>)


        })
        return (
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="source" error={required&&isSubmit}>Source</InputLabel>
                    <Select
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.source}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'source',
                            id: 'source',
                        }}
                        className={classes.Select}
                    >

                        {renderItem}

                    </Select>
                    {
                        required && isSubmit?<FormHelperText>*required</FormHelperText>:<span></span>
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

const mapDispatchToProps  = dispatch =>{
    return {
        selectSource: source =>(dispatch(selectSource(source))),
        selectDestination: destination =>(dispatch(selectDestination(destination))),
        destinationData: destination =>(dispatch(destinationData(destination)))
    }
}
const mapStateToProps = state =>{
    return {
        source: state.source,
        destination:state.destination,
        isSubmit:state.isSubmit,
        source_data:state.source_data
    }
}

Source.propTypes = {
    classes: PropTypes.object.isRequired,
};
const  SourceSelect = connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Source))

export default SourceSelect


