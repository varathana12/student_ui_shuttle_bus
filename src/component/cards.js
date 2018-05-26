import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import FolderList from './list'

const styles = {
    card: {
        margin:" 10px 16px"
    },

};

function SimpleMediaCard(props) {
    const { classes,student } = props;
    return (
        <div>
            <Card className={classes.card}>

                <CardContent>
                   <FolderList student={student}/>
                </CardContent>
            </Card>
        </div>
    );
}

SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);