import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import HomeIcon from 'material-ui-icons/Home';
import HistoryIcon from 'material-ui-icons/History';
import PeopleIcon from 'material-ui-icons/People';
import {chageTitleHeader,hideAppBar,} from "../actions";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {HOME,HISTORY,PROFILE} from "../constant/variable";
import {PREFIX,WIDTH} from "../constant/variable";

const styles = {
    root: {
        width: "100%",
        maxWidth:WIDTH,
        position:"fixed",
        bottom:0,
        zIndex:1,
        boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px " +
        "5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
    },
};

const mapDispatchToProps =dispatch =>{
    return {
        changeTitleHeader: nameRoute => (dispatch(chageTitleHeader(nameRoute))),
        hideAppBar :status => (dispatch(hideAppBar(status)))
    }
}
const mapStateToProps =state =>{
    return {
        nameRoute:state.nameRoute
    }
}

class BottomNavigator extends React.Component {

    handleChange = (event, value) => {
        const {changeTitleHeader,
            history,
            hideAppBar} = this.props;
        this.setState({ value });
        console.log(value)
        history.push(PREFIX+"/student/"+value)
        changeTitleHeader(value)
        value === PROFILE ? hideAppBar(true) : hideAppBar(false)

    };

    render() {
        const { classes,nameRoute } = this.props;
        return (
            <BottomNavigation
                value={nameRoute}
                onChange={this.handleChange}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label={HOME} value={HOME} icon={<HomeIcon />} />
                <BottomNavigationAction label={HISTORY} value={HISTORY} icon={<HistoryIcon />} />
                <BottomNavigationAction label={PROFILE} value={PROFILE} icon={<PeopleIcon />} />
            </BottomNavigation>
        );
    }
}

BottomNavigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(withRouter(BottomNavigator)));
