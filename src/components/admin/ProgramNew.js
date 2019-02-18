import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class ProgramNewForm extends Component {
  onSubmit = formValues => {
    //formValues passed to this from redux form this.props.handelSubmit
    this.props.onSubmit(formValues);
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

  renderInput = ({ input, label, meta }) => {
    //meta passes the errors from validation from the bottom of this file
    const className = `field ${meta.error && meta.touched ? 'error' : ''} `;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        {this.renderError(meta)}
      </div>
    );
  };

  render() {
    return (
      <form
        className='ui form error'
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name='title' label='Enter Title' component={this.renderInput} />
        <Field
          name='description'
          label='Enter Description'
          component={this.renderInput}
        />
        <button className='ui button primary'>Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'programForm',
})(ProgramNewForm);
