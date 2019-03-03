import React from 'react';
import TextField from '@material-ui/core/TextField';

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <div>
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      type='date'
      helperText={touched && error}
      {...input}
      {...custom}
      InputLabelProps={{ shrink: true }}
    />
  </div>
);

export default renderTextField;

// renderInput = ({ input, label, meta }) => {
//     //meta passes the errors from validation from the bottom of this file
//     const className = `field ${meta.error && meta.touched ? 'error' : ''} `;
//     return (
//       <div className={className}>
//         <label>{label}</label>
//         <input {...input} autoComplete='off' />
//         {this.renderError(meta)}
//       </div>
//     );
//   };
