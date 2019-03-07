import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, FastField as Field } from 'formik';
import * as Yup from 'yup';
import isEmpty from 'lodash/isEmpty';

const MaterialInput = props => {
  // console.log(rest);
  // console.log({ value });
  //   console.log({ fields });
  const fields = props.field;
  return (
    <React.Fragment>
      <TextField
        {...props}
        {...fields}
        //value={rest.values[props.name]}
        //InputLabelProps={inputLabelProps}
        //component={FormControl}
        // value={rest.values[props.name]}
        error={Boolean(
          props.form.touched[fields.name] && props.form.errors[fields.name],
        )}
        //label={(touched[field.name] && errors[field.name]) || label}
        helperText={
          props.form.touched[fields.name] && props.form.errors[fields.name]
        }
      />
      <p>Field gives us:</p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </React.Fragment>
  );
};

//ORIGINAL
// const MaterialInput = ({
//   field: { /* value, */ ...fields },
//   form: { touched, errors, ...rest },
//   ...props
// }) => {
//   // console.log(rest);
//   // console.log({ value });
//   console.log({ fields });
//   return (
//     <TextField
//       {...props}
//       {...fields}
//       //value={rest.values[props.name]}
//       //InputLabelProps={inputLabelProps}
//       //component={FormControl}
//       // value={rest.values[props.name]}
//       error={Boolean(touched[fields.name] && errors[fields.name])}
//       //label={(touched[field.name] && errors[field.name]) || label}
//       helperText={touched[fields.name] && errors[fields.name]}
//     />
//   );
// };

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
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters long.')
    .required('Title is required.'),
});

const initialValues = {
  title: '',
  // releaseYear: "",
  // genre: "",
  // price: "12"
};

const onSubmit = (values, actions) => {
  // this could also easily use props or other
  // local state to alter the behavior if needed
  // this.props.sendValuesToServer(values)

  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
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
        render={props => (
          <Form>
            <Field name='title' label='Title' component={MaterialInput} />

            <button
              type='submit'
              className='btn btn-default'
              //disabled={isSubmitting || !isEmpty(errors) || !dirty}
            >
              Submit
            </button>
            <p>Form gives us:</p>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </Form>
        )}
      />
    );
  }
}

export default withStyles(styles)(TextFields);
