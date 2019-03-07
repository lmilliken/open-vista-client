import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
//import TextField from "./TextField";
import { pure } from 'recompose';
import FormControl1 from '@material-ui/core/FormControl';

import FormLabel from '@material-ui/core/FormLabel';

// const TextField = pure(TextField1);
const FormControl = pure(FormControl1);

const inputLabelProps = {
  component: pure(FormLabel),
};

// {
//   field: { /* value, */ ...fields },
//   form: { touched, errors, ...rest },
//   ...props
// }
const MaterialInput = ({
  field: { /* value, */ ...fieldAttributes },
  form: { touched, errors, ...rest },
  ...props
}) => {
  // console.log({ props }); //custom props passed from <Field/>
  // console.log({ fieldAttributes }); //name, value, onBlur, onChange
  //console.log({ fields });
  return (
    <TextField
      {...props}
      {...fieldAttributes}
      //value={rest.values[props.name]}
      //InputLabelProps={inputLabelProps}
      //component={FormControl}
      // value={rest.values[props.name]}
      error={Boolean(
        touched[fieldAttributes.name] && errors[fieldAttributes.name],
      )}
      //label={(touched[field.name] && errors[field.name]) || label}
      helperText={touched[fieldAttributes.name] && errors[fieldAttributes.name]}
    />
  );
};

MaterialInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
    // the rest of the formik bag too
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default MaterialInput;
