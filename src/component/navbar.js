import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {WIDTH} from "../constant/variable";
import {connect} from 'react-redux'

const mapStateToProps = state =>{
    return {
        nameRoute: state.nameRoute,
        status: state.app_bar_status
    }
}

const styles = {
    root: {
        flexGrow: 1,
        position:"fixed",
        top:0,
        width:"100%",
        maxWidth:WIDTH,
        zIndex:1

    },
    title:{
        alignSelf:"center"
    }

};

function NavBar(props) {
    const { classes,nameRoute,status } = props;
    const handleAppBar = (status)=>{
        if(status){
            return (<div></div>)
        }
        else{
            return (
                <div className={classes.root}>
                    <AppBar position="static" color="primary" >
                        <Toolbar className={classes.title}>
                            <Typography variant="title" color="inherit" >
                                {nameRoute}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
            )
        }
    }
    return (
        <div>
            {handleAppBar(status)}
        </div>
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect (mapStateToProps)(withStyles(styles)(NavBar));
