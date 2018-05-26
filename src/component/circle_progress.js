import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
        position:"absolute",
        top:"calc(50% - 50px)",
        right:"calc(50% - 50px)"
    },
});

function CircularIndeterminate(props) {
    const { classes } = props;
    return (
            <CircularProgress className={classes.progress} size={50} />
    );
}

CircularIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);