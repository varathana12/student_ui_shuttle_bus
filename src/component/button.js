import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
const styles = theme => ({
    button: {
        padding:15,
        margin:"unset",
        border:"1px solid"
    },
});

function PrimaryButton(props) {
    const { classes,onSubmit} = props;
    return (
            <Button color="primary" onClick={onSubmit}
                    className={classes.button} fullWidth={true} size="large">
                Book Now
            </Button>

    );
}

PrimaryButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimaryButton)

