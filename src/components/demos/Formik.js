import React, { Component } from 'react';
import { withFormik } from 'formik';
import Yup from 'yup';

//old Andrew Mead way
class ProgramNew extends Component {
  render() {
    const { values, handleChange, handleSubmit } = this.props; //provided by Formik
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

// mapPropsToValues(props) {
//   return { email: props.email || '' };
// },

export default withFormik({
  mapPropsToValues() {
    return { email: 'ttest@mail.com', password: 'password' };
  },
  handleSubmit(values) {
    console.log({ values });
  },
})(ProgramNew);
