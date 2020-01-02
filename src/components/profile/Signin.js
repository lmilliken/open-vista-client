import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions';

class Signin extends Component {
  onSubmit = formProps => {
    //    console.log('hey', formProps);
    this.props.signin(formProps, () => {
      this.props.history.push('/profile'); //history provided by redux router
    }); //provided by redux's actions
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
        <button>Sign In</button>
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
  reduxForm({ form: 'signin' })
)(Signin);
