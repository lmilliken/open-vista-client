//from Stephen's Advanced React.  I used this to mofidy the Register component, which is a little more complicated b/c it users Material UI

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions';

class Signup extends Component {
  onSubmit = formProps => {
    //    console.log('hey', formProps);
    this.props.signup(formProps, () => {
      this.props.history.push('/profile'); //history provided by redux router
    }); //this.props.signup provided by actions from connect(mapStateToProps, actions) at the bottom of this file
  };

  render() {
    const { handleSubmit } = this.props; //provided by redux form to component props

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
            name='email'
            type='text'
            component='input'
            autoComplete='none'
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name='password'
            type='password'
            component='input'
            autoComplete='none'
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button>Sign Up</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  console.log('map state to props in Signup', state);
  return { errorMessage: state.auth.errorMessage };
}

//before adding connect
//export default reduxForm({ form: 'signup' })(Signup);

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(Signup);
