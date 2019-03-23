import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';

// {
//     children,
//     field: { /* value, */ ...fields },
//     form: { touched, errors, ...rest },
//     ...props
//   }
const MaterialInput = ({
  label,
  children,
  field,
  form: { touched, errors },
  ...props
}) => {
  // console.log(props);
  //  console.log({ field });
  // console.log({ attributes });
  //   console.log({ ...props });
  //   console.log({ attributes });
  //   console.log({ ...rest });
  //   console.log({ touched });
  // console.log({ errors });

  return (
    <FormControl
      {...props}
      error={errors[field.name] || (touched[field.name] && errors[field.name])}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        native
        {...field}
        input={<OutlinedInput name={field.name} labelWidth={100} />}
      >
        {children}
      </Select>
      {errors[field.name] && (
        <FormHelperText>{errors[field.name]}</FormHelperText>
      )}
    </FormControl>
  );
  //  return null;
};

export default MaterialInput;
