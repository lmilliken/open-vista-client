import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';

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
      <option value={type.id} key={type.id}>
        {type.name}
      </option>
    ));
  }

  render() {
    console.log('props in ProgramNew ', this.props);
    return (
      <form
        className='ui form error'
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name='title' label='Enter Title' component={renderTextField} />
        <Field
          name='programType'
          label='Program Type'
          component={renderSelectField}
        >
          <option value='' />
          {this.getProgramTypeOptions()}
        </Field>

        <Field
          name='description'
          label='Enter Description'
          multiline
          rows='4'
          component={renderTextField}
        />
        <Field
          name='dateStart'
          label='Start Date'
          component={renderDatePicker}
        />
        <Field name='dateEnd' label='End Date' component={renderDatePicker} />
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    );
  }
}

const mapStateToProps = ({ shared: { programTypes } }) => {
  console.log('state in mSP: ', programTypes);
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
