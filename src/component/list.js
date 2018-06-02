import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText,ListItemIcon } from 'material-ui/List';
import EmailIcon from 'material-ui-icons/Email';
import PhoneIcon from 'material-ui-icons/Phone';
import DirectionBusIcon from 'material-ui-icons/DirectionsBus'
import {success,danger} from "../constant/color";
import Exit from '@material-ui/icons/ExitToApp'
import Logout from './dialog/logout'

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class  FolderList extends React.Component {
    state={
        open:false,
    }
    onConfirm(){
        document.getElementById("logoutForm").submit();
    }
    render() {
        const {classes, student} = this.props;
        const {open} = this.state
        return (
            <div className={classes.root}>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <EmailIcon style={{color: success}}/>
                        </ListItemIcon>
                        <ListItemText secondary={student.email} primary="Email"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <DirectionBusIcon style={{color: success}}/>
                        </ListItemIcon>
                        <ListItemText secondary={student.ticket + " Tickets"} primary="Ticket remaining"/>
                    </ListItem>
                </List>
                <ListItem button onClick={()=>this.setState({open:true})}>
                    <ListItemIcon>
                        <Exit style={{color: danger}}/>
                    </ListItemIcon>
                    <ListItemText primary="Logout" secondary="logout from system"/>
                </ListItem>
                <Logout open={open} onClose={() => this.setState({open: false})} onConfirm={() => this.onConfirm()}/>
            </div>
        );
    }
}

FolderList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);