/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, {
} from 'material-ui/Dialog';
import blue from 'material-ui/colors/blue';

var QRCode = require('qrcode-react');
const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    dialog:{
        margin:0,
        flexDirection:"row"
    }
};

class QRView extends React.Component {

    render() {
        const { classes, onClose, open , qr} = this.props;
        return (
            <Dialog onClose={this.handleClose} className={classes.dialog} aria-labelledby="simple-dialog-title" open={open}
                    onClose={onClose} >
                <div style={{padding:10,paddingBottom:8}}>
                    <QRCode value={qr} size={200}/>
                </div>


            </Dialog>
        );

    }
}

QRView.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(QRView);
