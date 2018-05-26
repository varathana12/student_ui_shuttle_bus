import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText,ListItemIcon } from 'material-ui/List';
import EmailIcon from 'material-ui-icons/Email';
import PhoneIcon from 'material-ui-icons/Phone';
import SchoolIcon from 'material-ui-icons/School';
import DirectionBusIcon from 'material-ui-icons/DirectionsBus'
import {success} from "../constant/color";

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

function FolderList(props) {
    const { classes,student } = props;
    return (
        <div className={classes.root}>
            <List>
                <ListItem button>
                        <ListItemIcon >
                        <EmailIcon style={{color:success}} />
                        </ListItemIcon>
                    <ListItemText primary={student.email} secondary="email" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PhoneIcon style={{color:success}}/>
                    </ListItemIcon>
                    <ListItemText primary={student.phone? student.phone : "Unknown"} secondary="phone number" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SchoolIcon style={{color:success}}/>
                    </ListItemIcon>
                    <ListItemText primary={"Batch "+student.batch} secondary="generation" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DirectionBusIcon style={{color:success}}/>
                    </ListItemIcon>
                    <ListItemText primary={student.ticket+" Tickets"} secondary="ticket remaining" />
                </ListItem>

            </List>
        </div>
    );
}

FolderList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);