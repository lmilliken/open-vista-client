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

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
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
