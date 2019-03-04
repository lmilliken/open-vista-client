import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import renderTextField from '../common/renderTextField';
import renderSelectField from '../common/renderSelectField';
import renderDatePicker from '../common/renderDatePicker';

class ProgramNewForm extends React.Component {
  onSubmit = formValues => {
    //formValues passed to this from redux form this.props.handelSubmit
    console.log({ formValues });
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

  getProgramTypeOptions() {
    if (!this.props.programTypes) {
      return null;
    }
    const types = this.props.programTypes;
    return types.map(type => (
      <option value={type._id} key={type.id}>
        {type.name}
      </option>
    ));
  }

  render() {
    // console.log('props in ProgramNew ', this.props);
    return (
      <form
        className='ui form error'
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name='title'
          label='Enter Title'
          component={renderTextField}
          variant='outlined'
          fullWidth
          margin='normal'
        />
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Field
              name='programType'
              label='Program Type'
              component={renderSelectField}
              variant='outlined'
              fullWidth
            >
              <option value={null} key='blank' />
              {this.getProgramTypeOptions()}
            </Field>
          </Grid>
        </Grid>

        <Field
          name='description'
          label='Enter Description'
          multiline
          rows='4'
          component={renderTextField}
          variant='outlined'
          fullWidth
          margin='normal'
        />
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <Field
              name='dateStart'
              label='Start Date'
              component={renderDatePicker}
              variant='outlined'
              fullWidth
              margin='normal'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name='dateEnd'
              label='End Date'
              component={renderDatePicker}
              variant='outlined'
              fullWidth
              margin='normal'
            />
          </Grid>
        </Grid>
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    );
  }
}
// { shared: { programTypes } } programTypes: programTypes
const mapStateToProps = ({ shared: { programTypes } }) => {
  // console.log('state in mSP: ', state);
  return { programTypes: programTypes };
};

// export default reduxForm({
//   form: 'programForm',
// })(ProgramNewForm);

const programForm = reduxForm({
  form: 'programForm',
});

export default connect(
  mapStateToProps,
  null,
)(programForm(ProgramNewForm));
