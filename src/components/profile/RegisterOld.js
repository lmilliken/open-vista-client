import React from 'react';
import { connect } from 'react-redux';
// // import { register } from '../../actions';

import * as Yup from 'yup';
// import { Field, reduxForm } from 'redux-form';
import { Formik, Form, Field } from 'formik';
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
import TextField from '../common/TextFieldFormik';
import CheckboxFormik from '../common/CheckboxFormik';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { SubmissionError } from 'redux-form';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1) * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

const onSubmit = (values, actions) => {
  console.log('register clicked');
  console.log({ values });
  console.log({ actions });
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { completed: false };
    // this.register = this.register.bind(this);
  }

  render() {
    const { classes } = this.props;

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
        {/* <CssBaseline /> */}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Register
          </Typography>
          <Formik
            validationSchema={Yup.object().shape({
              nameFirst: Yup.string().required('First name is required.'),
              nameLast: Yup.string().required('Last name is required.'),
              email: Yup.string()
                .required('Email is required.')
                .email('Invalid email address'),
              terms: Yup.boolean().required('Must agree to terms.'),
            })}
            initialValues={{
              nameFirst: '',
              nameLast: '',
              email: '',
              terms: '',
            }}
            onSubmit={onSubmit}
            render={props => {
              return (
                <Form className={classes.form}>
                  <Field
                    name='nameFirst'
                    component={TextField}
                    label='First Name'
                    fullWidth
                  />
                  <Field
                    name='nameLast'
                    component={TextField}
                    label='Last Name'
                    fullWidth
                  />
                  <Field
                    name='email'
                    component={TextField}
                    label='Email'
                    type='email'
                    fullWidth
                  />
                  <Field
                    name='password'
                    component={TextField}
                    label='Password'
                    type='password'
                    fullWidth
                  />
                  <Field
                    name='terms'
                    component={CheckboxFormik}
                    label='I agree to the terms and condition of use.'
                  />

                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                  >
                    Register
                  </Button>
                  <pre>{JSON.stringify(props, null, 2)}</pre>
                </Form>
              );
            }}
          />

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
  // console.log('map state to props: {state} : ', state);
  return {
    registerForm: state.form.registerForm,
  };
};

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null,
  )(Register),
);

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
