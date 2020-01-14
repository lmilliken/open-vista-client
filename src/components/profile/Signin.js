//from Stephen's Advanced React.  I used this to mofidy the Login component, which is a little more complicated b/c it users Material UI

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import * as actions from '../../actions';
import config from '../../config';

import './index.css';
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

class Signin extends Component {
  onSubmit = formProps => {
    //    console.log('hey', formProps);
    this.props.signin(formProps, () => {
      this.props.history.push('/profile'); //history provided by redux router
    }); //provided by redux's actions
  };

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );

  render() {
    const { classes } = this.props;
    console.log('props in Signin: ', this.props);
    const { handleSubmit } = this.props; //provided by redux form to component props

    return (
      <div className={classes.main}>
        <CssBaseline />
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='email'>Email Address</InputLabel>
            <Field
              name='email'
              type='text'
              component={this.renderTextField}
              autoComplete='none'
              label='Email'
            />
          </FormControl>
          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Field
              name='password'
              type='password'
              component={this.renderTextField}
              autoComplete='none'
              label='Password'
            />
          </FormControl>
          <div>{this.props.errorMessage}</div>
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
        <Typography>Or signin with</Typography>
        <a href={config.apidomain + '/auth/google'} class='google-oauth-button'>
          <div>
            <span class='svgIcon t-popup-svg'>
              <svg
                class='svgIcon-use'
                width='25'
                height='37'
                viewBox='0 0 25 25'
              >
                <g fill='none' fill-rule='evenodd'>
                  <path
                    d='M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z'
                    fill='#4285F4'
                  />
                  <path
                    d='M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z'
                    fill='#34A853'
                  />
                  <path
                    d='M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z'
                    fill='#FBBC05'
                  />
                  <path
                    d='M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z'
                    fill='#EA4335'
                  />
                </g>
              </svg>
            </span>
            <span class='button-label'>Sign in with Google</span>
          </div>
        </a>
        <br />
        <a href='http://localhost:5000/auth/google'>
          Google (href = 'http://localhost:5000/auth/google')
        </a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('map state to props in Signup', state);
  return { errorMessage: state.auth.errorMessage };
}

//before adding connect
//export default reduxForm({ form: 'signup' })(Signup);

export default compose(
  withStyles(styles),
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(Signin);
