import React from 'react'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
const styles = {
    root: {
        paddingTop:56,
        paddingBottom:66,
        paddingLeft:16,
        paddingRight:16,
        overflowY:"hidden",
        overflowX:"hidden"
    }

};
class Layout extends React.Component{

    render(){
        const {classes,children} = this.props
        return(
            <div className={classes.root}>
                {children}
        </div>
        )
    }
}
Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Layout)