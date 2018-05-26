
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';


const styles = {

};

class QRView extends React.Component {
    render() {
        const {open,onClose} = this.props;

        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <img style={{maxWidth:400}} width={(window.outerWidth-64)+"px"}
                     src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9AQAAAACn+1GIAAAApEl" +
                     "EQVR42u3VMQ7DMAwDQP6A//+lxm4qxbZoPZpOtwQGnNxg2JSMoNfngRsugALQgKcYPN5TCoVqlqcTqOIFU" +
                     "GcwQ9/raTdB6XrN39Q3wc9saqn+HhQbZM2cg96ISYk5tMNRqRCDDkZH9Ak5AfeKztfIYTp/9oaOwcXWkqwDe" +
                     "OWszTGH6Xr4CpzB2jAZqNDf6gdgU/P+XuRdmJCbBDuG+x/1b3gCOSaFcLrWXbIAAAAASUVORK5CYII\n"}></img>
            </Dialog>
        );
    }
}

QRView.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.object.isRequired,

};

export default withStyles(styles)(QRView);