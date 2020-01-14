import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { fetchUser } from '../actions';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';

import * as actions from '../actions';
import config from '../config';
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(1) * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(3)
  }
});

// class Signin extends React.Component {
//   state = {
//     redirectToReferrer: false
//   };

//   signin = () => {
//     this.props.signin();
//   };
// }

class Login extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }
  onSubmit = formProps => {
    console.log('hey', formProps);
    this.props.signin(formProps, () => {
      this.props.history.push('/profile'); //history provided by redux router
    }); //provided by redux's actions
  };

  state = { email: '', password: '', error: '', redirectToReferrer: false };

  renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );
  render() {
    const { classes, handleSubmit } = this.props;
    // console.log('state: ', this.state);
    // console.log('props in Profile: ', this.props);

    let { from } = this.props.location.state || { from: { pathname: '/' } };

    //    console.log({ from });
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      //   console.log('redirecting to: ', from.pathname);
      return <Redirect to={from.pathname} />;
    }
    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name='email'
              component={this.renderTextField}
              label='Email'
              type='email'
              fullWidth
            />
            <Field
              name='password'
              component={this.renderTextField}
              label='Password'
              type='password'
              fullWidth
            />
            <div>{this.props.errorMessage}</div>
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Typography color='error'>{this.state.error}</Typography>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>

          {/* <Button
            variant='contained'
            color='primary'
            onClick={e => {
              e.preventDefault();
              window.location.href = '/auth/google';
            }}
          >
            Google proxy href = '/auth/google'
          </Button> */}
        </Paper>
        <Typography>Or signin with</Typography>
        {/* <Button
            variant='contained'
            color='primary'
            onClick={e => {
              e.preventDefault();
              window.location.href = 'http://localhost:5000/auth/google';
            }}
          >
            Google href = 'http://localhost:5000/auth/google'
          </Button> */}
        <a href='http://localhost:5000/auth/google'>
          Google (href = 'http://localhost:5000/auth/google')
        </a>
        <br />
        <br />
        <a href='https://open-vista-sdev.herokuapp.com/auth/google'>
          Google (href = ''https://open-vista-sdev.herokuapp.com/auth/google')
        </a>
        {/* <Button
            variant='contained'
            color='primary'
            onClick={e => {
              e.preventDefault();
              window.location.href =
                'https://open-vista-sdev.herokuapp.com/auth/google';
            }}
          >
            Google href = 'http://localhost:5000/auth/google'
          </Button> */}
        <br />
        <br />
        <a href='/auth/google'>Google proxied (href ='/auth/google')</a>
        <br />
        <br />
        <Typography component={Link} to='/register'>
          Don't have a login? Signup.
        </Typography>
      </div>
    );
  }
}

// onClick={() => {
//   window.location.href = '/auth/google';
// }}>

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  console.log('map state to props in Login', state);
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(Login);
