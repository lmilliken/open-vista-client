import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPrograms } from '../../actions';
import api from '../../api';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    minWidth: 275,
    padding: '30px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  button: {
    margin: theme.spacing(1),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function ProgramCard(props) {
  // console.log('program card props', props);

  return (
    <Card className={props.className} style={{ padding: '20px' }}>
      <CardContent>
        <Typography color='textSecondary' gutterBottom>
          {props.type.name}
        </Typography>
        <Typography variant='h5' component='h2'>
          {props.title}
        </Typography>
        <Typography color='textSecondary'>
          {new Date(props.dateStart).toLocaleDateString() +
            ' - ' +
            new Date(props.dateEnd).toLocaleDateString()}
        </Typography>
        <Typography component='p'>{props.description}</Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' color='primary'>
          Manage
        </Button>
        <Button variant='outlined' color='primary'>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

Card.propTypes = {
  classes: PropTypes.object.isRequired,
};

class Programs extends React.Component {
  state = { error: false, programs: [] };

  componentDidMount() {
    axios
      .get('/api/programs')
      .then(res => this.setState({ programs: res.data, error: false }))
      .catch(e => this.setState({ error: true }));
  }
  render() {
    // console.log('Programs props', this.props);
    const { classes } = this.props;
    if (this.state.error === true) {
      return <p>Something went wrong</p>;
    }
    return (
      <React.Fragment>
        <Typography variant='h5' style={{ marginBottom: '20px' }}>
          Programs
        </Typography>
        {this.state.programs.map(program => (
          <ProgramCard
            className={classes.card}
            key={program._id}
            {...program}
          />
        ))}
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          component={Link}
          to='/programnew'
        >
          Add New Program
        </Button>
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({
  shared: { programTypes, users },
  fetchPrograms,
}) => {
  // console.log('state in mSP: ', users);
  // return null;
  return { programTypes, users, fetchPrograms };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { fetchPrograms },
  )(Programs),
);
