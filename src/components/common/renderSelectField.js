import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const renderSelectField = ({
  name,
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  return (
    <FormControl {...custom} error={touched && error}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select
        native
        {...input}
        {...custom}
        inputProps={{
          name: { name },
          id: { name },
        }}
        input={<OutlinedInput name={name} labelWidth={100} />}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  );
};

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

// const renderSelectFieldReduxOriginal = ({
//   input,
//   label,
//   meta: { touched, error },
//   children,
//   ...custom
// }) => (
//   <FormControl error={touched && error}>
//     <InputLabel htmlFor='age-native-simple'>Age</InputLabel>
//     <Select
//       native
//       {...input}
//       {...custom}
//       inputProps={{
//         name: 'age',
//         id: 'age-native-simple',
//       }}
//     >
//       {children}
//     </Select>
//     {renderFromHelper({ touched, error })}
//   </FormControl>
// );

export default renderSelectField;
