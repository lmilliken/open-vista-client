import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import FormLabel from '@material-ui/core/FormLabel';

// {
//     label,
//     children,
//     field: { /* value, */ ...fields },
//     form: { touched, errors, ...rest },
//     ...props
//   }
const MaterialInput = ({
  label,
  children,
  field: { /* value, */ ...fields },
  form: { touched, errors, ...rest },
  ...props
}) => {
  //  console.log(props);
  // console.log({ value });
  //console.log({ fields });
  //   console.log({ ...props });
  //   console.log({ fields });
  //   console.log({ ...rest });
  //   console.log({ touched });
  //   console.log({ errors });
  const name = fields.name;
  return (
    <FormControl {...props} error={touched[fields.name] && errors[fields.name]}>
      <InputLabel>{label}</InputLabel>
      <Select
        native
        {...fields}
        input={<OutlinedInput name={fields.name} labelWidth={100} />}
      >
        {children}
      </Select>
      {errors[fields.name] && (
        <FormHelperText>{errors[fields.name]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default MaterialInput;
