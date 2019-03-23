import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import TextField from '../common/TextFieldFormik';
import Select from '../common/SelectFormik';
import DatePicker from '../common/DatePickerFormik';
import SelectAutoFormik from '../common/SelectAutoFormik';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { createProgram } from '../../actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: 30,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required.'),
  type: Yup.string().required('Program type is required.'),
  description: Yup.string().required('Description is required'),
  dateStart: Yup.date().required('Start date is required.'),
  dateEnd: Yup.date().required('Start date is required.'),
  admins: Yup.string().required('Administrator is required.'),
});

const initialValues = {
  title: 'Title',
  description: 'Description',
  programType: '5c77af995d7aa31db8cf3878',
  dateStart: '',
  dateEnd: '',
  admins: [],
};

class ProgramNew extends React.Component {
  onSubmit = (values, actions) => {
    console.log('on submit', values);
    const payload = {
      ...values,
      admins: values.admins.value,
    };
    // this could also easily use props or other
    // local state to alter the behavior if needed
    // this.props.sendValuesToServer(values)
    const { createProgram } = this.props;
    // console.log({ values });
    createProgram(payload);
  };

  getProgramTypeOptions() {
    if (!this.props.programTypes.types) {
      return null;
    }
    const types = this.props.programTypes.types;
    //  console.log({ types });
    return types.map(type => (
      <option value={type._id} key={type._id}>
        {type.name}
      </option>
    ));
  }

  getUsers() {
    if (!this.props.users.users) {
      return null;
    }
    const users = this.props.users.users;
    // console.log(this.props.users);
    return users.map(user => ({
      value: user._id,
      label: `${user.nameFirst} ${user.nameLast} (${user.email})`,
    }));
  }

  render() {
    // console.log('program new props: ', this.props);
    const typesPending = this.props.programTypes.isPending;
    const usersPending = this.props.users.isPending;

    const { classes } = this.props;
    if (typesPending || usersPending) {
      return <p>Loading...</p>;
    }
    const typesError = this.props.programTypes.error;
    const usersError = this.props.users.error;
    if (typesError || usersError) {
      return (
        <React.Fragment>
          <p>Something went wrong. Please contact the administrator</p>
          <pre>Failed to get programTypes {typesError.toString()}</pre>
          <pre>Failed to get users {usersError.toString()}</pre>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Typography variant='h5' style={{ marginBottom: '20px' }}>
          Create a New Program
        </Typography>
        <Paper className={classes.paper}>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={this.onSubmit}
            // render={props => {
            //   const {
            //     values,
            //     touched,
            //     dirty,
            //     errors,
            //     handleChange,
            //     handleBlur,
            //     handleSubmit,
            //     handleReset,
            //     setFieldValue,
            //     setFieldTouched,
            //     isSubmitting,
            //   } = props;
            render={props => {
              const {
                values,
                touched,
                errors,
                setFieldValue,
                setFieldTouched,
                isSubmitting,
              } = props;
              return (
                <Form>
                  <Field
                    name='title'
                    label='Title'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    component={TextField}
                  />
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name='type'
                        label='Program Type'
                        component={Select}
                        variant='outlined'
                        fullWidth
                      >
                        <option value={null} key='blank' />
                        {this.getProgramTypeOptions()}
                        ))}
                      </Field>
                    </Grid>
                  </Grid>
                  <Field
                    name='description'
                    label='Description'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    multiline
                    rows='4'
                    component={TextField}
                  />
                  <Grid container spacing={16}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name='dateStart'
                        label='Start Date'
                        component={DatePicker}
                        variant='outlined'
                        fullWidth
                        margin='normal'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name='dateEnd'
                        label='End Date'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        component={DatePicker}
                      />
                    </Grid>
                  </Grid>
                  <Typography style={{ marginTop: '20px' }} variant='subtitle2'>
                    Administator
                  </Typography>
                  <Field
                    name='admin'
                    label='Administrator'
                    variant='outlined'
                    fullWidth
                    // margin='normal'
                    placeholder="Start typing a user's name or email."
                    value={values.admins}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.admins}
                    touched={touched.admins}
                    component={SelectAutoFormik}
                    options={this.getUsers()}
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    style={{ marginTop: '20px' }}
                    disabled={isSubmitting}
                    // disabled={isSubmitting || !isEmpty(errors) || !dirty}
                  >
                    Submit
                  </Button>
                  <pre>{JSON.stringify(props, null, 2)}</pre>
                </Form>
              );
            }}
          />
        </Paper>
      </React.Fragment>
    );
  }
}
//{ shared: { programTypes } }
const mapStateToProps = ({
  shared: { programTypes, users },
  createProgram,
}) => {
  // console.log('state in mSP: ', users);
  // return null;
  return { programTypes, users, createProgram };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { createProgram },
  )(ProgramNew),
);
