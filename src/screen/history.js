import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Layout from './layout'
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import {SimpleTable} from '../root'
import {historyData, sourceData} from "../actions";
import {get_history, source_data_api} from "../api";
import {id_to_name,convert_date_fomart} from "../init";
import {standard} from "../init/date_fuction";
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop:30
    },
    expand:{
        paddingTop:12,
        paddingBottom:12,
        marginTop:10
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    Typography_expand:{
        width:"100%"
    }

});

class History extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };
    componentWillMount(){
        const {history_data,historyData}= this.props
        if(history_data.length === 0){
            get_history().then(res=>{
                historyData(res)
            })
        }

    }

    render() {
        const { classes,history_data,source_data } = this.props;
        const { expanded } = this.state;
        return (
            <Layout>
            <div className={classes.root}>
                {
                    history_data.map((item,index) => {

                        return (
                            <ExpansionPanel className={classes.expand} key={index} expanded={expanded === ''+index}
                                            onChange={this.handleChange(''+index)}>
                                <ExpansionPanelSummary style={{width:"unset"}} expandIcon={<ExpandMoreIcon />}>
                                    <table className="table_expand">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Typography style={{whiteSpace:"nowrap"}} className={classes.heading}>
                                                        {item.source_name+" -- "+item.destination_name}</Typography>
                                                </td>
                                                <td>
                                                    <Typography style={{whiteSpace:"nowrap"}} className={classes.secondaryHeading}>
                                                        {" : "+standard(item.departure_date)}</Typography>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography style={{width:"100%"}}>
                                        <SimpleTable data={item}/>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                        }
                    )
                }
            </div>
            </Layout>
        );
    }
}

History.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        historyData: data => (dispatch(historyData(data))),
        source: data =>(dispatch(sourceData(data))),
    }
}
const mapStateToProps =state =>{
    return {
        history_data:state.history_data,
        source_data:state.source_data
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(History));
