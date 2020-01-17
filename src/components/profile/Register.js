import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';

import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
//import TextField from '../common/TextFieldFormik';
import TextField from '@material-ui/core/TextField';
// CheckboxFormik from '../common/CheckboxFormik';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { SubmissionError } from 'redux-form';

import * as actions from '../../actions';
import config from '../../config';

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

//for material ui
const renderTextField = ({
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

class Register extends React.Component {
  onSubmit = formProps => {
    this.props.signup(formProps, () => {
      this.props.history.push('/profile'); //history provided by redux router
    }); //this.props.signup provided by actions from connect(mapStateToProps, actions) at the bottom of this file
  };

  render() {
    const { classes, handleSubmit } = this.props; //handleSubmit provided by redux form to component props

    // if (this.state.completed === true) {
    //   return (
    //     <div className={classes.main}>
    //       {/* <CssBaseline /> */}
    //       <Paper className={classes.paper}>
    //         <Typography component='h1' variant='h5'>
    //           Thank you for registering. Please check your email account to
    //           activate your account.
    //         </Typography>
    //       </Paper>
    //     </div>
    //   );
    // } else {
    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Register
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name='nameFirst'
              component={renderTextField}
              label='First Name'
              fullWidth
              value='test first'
            />
            <Field
              name='nameLast'
              component={renderTextField}
              label='Last Name'
              fullWidth
              value='test first'
            />
            <Field
              name='email'
              component={renderTextField}
              label='Email'
              type='email'
              fullWidth
              value='larry@miller.com'
            />
            <Field
              name='password'
              component={renderTextField}
              label='Password'
              type='password'
              fullWidth
              value='123'
            />
            {/* <Field
              name='terms'
              component={CheckboxFormik}
              label='I agree to the terms and condition of use.'
            /> */}
            <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Register
            </Button>
          </form>

          <Typography>Or register with</Typography>
          <FormControlLabel
            control={<Checkbox value='checkedA' />}
            label='Secondary'
          />
          <Button
            variant='contained'
            color='secondary'
            onClick={e => {
              e.preventDefault();
              window.location.href = '/auth/google';
            }}
          >
            Google
          </Button>
        </Paper>
      </div>
    );
  }
}

// onClick={() => {
//   window.location.href = '/auth/google';
// }}>

const mapStateToProps = state => {
  //  console.log('map state to props: {state} : ', state);
  return { errorMessage: state.auth.token.errorMessage };
};

// Register.propTypes = {
//   classes: PropTypes.object.isRequired
// };

//export default withStyles(styles)(connect(mapStateToProps, null)(Register));
export default compose(
  withStyles(styles),
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(Register);
//   register = async values => {
//     // check to see if user email already exists
//     const duplicateEmailCheck = await axios.post('/api/checkdupemail', {
//       email: values.email,
//     });
//     if (duplicateEmailCheck.data === true) {
//       throw new SubmissionError({
//         email: 'User email already exists.  Please try logging in.',
//         _error: 'Login failed!',
//       });
//     }

//     axios
//       .post(`/api/register`, {
//         ...values,
//       })
//       .then(response => {
//         console.log({ response });
//         this.setState({ completed: true });
//       })
//       .catch(error => {
//         console.log('error in /api/register: ', error);
//       });

//     // const { register } = this.props;
//     // register(values);
//     //might need logic to make sure that this succeeds before redirecting them?
//   };
