import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withTheme } from 'material-ui/styles';
import {SimpleMediaCard,ImageAvatars} from '../root'
import {student_data} from "../api";
import {connect} from 'react-redux'
import {studentInfo} from "../actions";
const styles = theme => ({
    root:{
        marginBottom:66
    },
    profile: {
        height:200,
    },
});

class Profile extends React.Component {
    state={
        student_info:{}
    }
    componentWillMount(){
        const {student_info,studentInfo} = this.props
        console.log(this.props)
        if(!student_info.email) {
            student_data().then(res => {
                studentInfo(res)
            })
        }
    }

    render() {
        const { classes,student_info } = this.props;
        const {primary} = this.props.theme.palette
        return (
            <div className={classes.root}>
            <div className={classes.profile} style={{backgroundColor:primary.main}}>
                <ImageAvatars image={this.state.profile} username={student_info.username}/>
            </div>
                <SimpleMediaCard student={student_info}/>
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
    return {
        studentInfo: data => (dispatch(studentInfo(data)))
    }
}
const mapStateToProps =state =>{
    return {

        student_info:state.student_info
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withTheme()(withStyles(styles)(Profile)));