import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import {Avatar,Typography} from 'material-ui';

const styles = {
    root:{

      display:"flex",
      flexDirection:"column"
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 80,
        height: 80,
    },
    name:{
        color:"white",
        fontSize:20
    }

};

function ImageAvatars(props) {
    const { classes,image } = props;
    return (
        <div className={classes.root}>
            <div className={classes.row} style={{marginTop:15}}>
                <Avatar
                    alt="Adelle Charles"
                    src={image}
                    className={classNames(classes.avatar, classes.bigAvatar)}
                />
            </div>
            <div className={classes.row}>
                <Typography gutterBottom variant="headline" component="h3" className={classes.name}>
                    Va Rathana
                </Typography>
            </div>
        </div>

    );
}

ImageAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);