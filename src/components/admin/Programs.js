import React from 'react';
import { connect } from 'react-redux';

import { fetchPrograms } from '../../actions';
import api from '../../api';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function ProgramCard(props) {
  const { classes } = props;

  console.log('program card type: ', typeof props.dateStart);
  const date = new Date(props.dateStart);
  return (
    <Card>
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
        <Button size='small'>Manage</Button>
        <Button size='small'>Edit</Button>
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
    api
      .get('/api/programs')
      .then(res => this.setState({ programs: res.data, error: false }))
      .catch(e => this.setState({ error: true }));
  }
  render() {
    console.log('Programs state', this.state);
    if (this.state.error === true) {
      return <p>Something went wrong</p>;
    }
    return this.state.programs.map(program => <ProgramCard {...program} />);
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
