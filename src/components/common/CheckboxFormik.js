import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
const CheckboxFormik = props => {
  console.log({ props });
  return (
    <FormControl error>
      <FormControlLabel
        control={<Checkbox checked={props.field.value} {...props.field} />}
        label={props.label}
      />
      {<FormHelperText>You must agree to terms.</FormHelperText>}
    </FormControl>
  );
};

export default CheckboxFormik;
