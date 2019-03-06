import React from 'react';
import { Formik, Form, FastField as Field } from 'formik';
import * as Yup from 'yup';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import isEmpty from 'lodash/isEmpty';
import TextField from './TextFieldFormik';
import Select from './SelectFormik';
import DatePicker from './DatePickerFormik';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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

  setTimeout(() => {
    console.log({ values });
    actions.setSubmitting(false);
  }, 1000);
};

class TextFields extends React.Component {
  render() {
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={props => {
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
                    <option value='1'>option1</option>
                    <option value='2'>option2</option>
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

              <Field
                name='dateEnd'
                label='End Date'
                variant='outlined'
                fullWidth
                margin='normal'
                component={DatePicker}
              />
              <button
                type='submit'
                variant='contained'
                color='primary'
                //disabled={isSubmitting || !isEmpty(errors) || !dirty}
              >
                Submit
              </button>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </Form>
          );
        }}
      />
    );
  }
}

export default withStyles(styles)(TextFields);
