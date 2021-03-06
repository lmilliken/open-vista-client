import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import isEmpty from 'lodash/isEmpty';
import TextField from '../common/TextFieldFormik';
import Select from '../common/SelectFormik';
import DatePicker from '../common/DatePickerFormik';
import SelectFormikReact from '../common/SelectAutoFormik';

import AutoSelect from '../demos/AutoSelect';
// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
//   menu: {
//     width: 200,
//   },
// });

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing(1) / 2}px ${theme.spacing(1) / 4}px`,
  },
  // chipFocused: {
  //   backgroundColor: emphasize(
  //     theme.palette.type === 'light'
  //       ? theme.palette.grey[300]
  //       : theme.palette.grey[700],
  //     0.08,
  //   ),
  // },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
});

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required.'),
  programType: Yup.string().required('Program type is required.'),
  description: Yup.string().required('Description is required'),
});

const initialValues = {
  title: '',
  description: '',
  programType: '',
};

const onSubmit = (values, actions) => {
  // this could also easily use props or other
  // local state to alter the behavior if needed
  // this.props.sendValuesToServer(values)
  console.log({ actions });
  setTimeout(() => {
    console.log({ values });
    actions.setSubmitting(false);
  }, 1000);
};

class ProgramNew extends React.Component {
  getProgramTypeOptions() {
    if (!this.props.programTypes.types) {
      return null;
    }
    const types = this.props.programTypes.types;
    console.log({ types });
    return types.map(type => (
      <option value={type._id} key={type.id}>
        {type.name}
      </option>
    ));
  }

  getUsers() {
    if (!this.props.users.users) {
      return null;
    }
    const users = this.props.users.users;
    console.log(this.props.users);
    return users.map(user => ({
      value: user._id,
      label: `${user.nameFirst} ${user.nameLast} (${user.email})`,
    }));
  }

  render() {
    const typesPending = this.props.programTypes.isPending;
    const usersPending = this.props.users.isPending;
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
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={props => {
          const {
            values,
            touched,
            dirty,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
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
                    name='programType'
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
              <Field
                name='admins'
                label='Admins'
                variant='outlined'
                fullWidth
                margin='normal'
                value={values.admins}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.admins}
                touched={touched.admins}
                component={SelectFormikReact}
                options={this.getUsers()}
              />

              {/* <SelectFormikReact
                value={values.admins}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.admins}
                touched={touched.admins}
              /> */}

              <Button
                type='submit'
                variant='contained'
                color='primary'
                //disabled={isSubmitting || !isEmpty(errors) || !dirty}
              >
                Submit
              </Button>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </Form>
          );
        }}
      /> //Formik
    );
  }
}
//{ shared: { programTypes } }
const mapStateToProps = ({ shared: { programTypes, users } }) => {
  // console.log('state in mSP: ', users);
  // return null;
  return { programTypes, users };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null,
  )(ProgramNew),
);
