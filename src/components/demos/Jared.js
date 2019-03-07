// import './formik-demo.css';
import React from 'react';
import { render } from 'react-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Select from 'react-select';

const DisplayFormikState = props => (
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem',
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    topics: Yup.array()
      .min(3, 'Pick at least 3 tags')
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        }),
      ),
  }),
  mapPropsToValues: props => ({
    email: '',
    topics: [],
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
      topics: values.topics.map(t => t.value),
    };
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'MyForm',
});

const MyForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email' style={{ display: 'block' }}>
        Email
      </label>
      <input
        id='email'
        placeholder='Enter your email'
        type='email'
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.email && touched.email && (
        <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.email}</div>
      )}
      <MySelect
        value={values.topics}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        error={errors.topics}
        touched={touched.topics}
      />
      <button
        type='button'
        className='outline'
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type='submit' disabled={isSubmitting}>
        Submit
      </button>

      <DisplayFormikState {...props} />
    </form>
  );
};

const options = [
  { value: 'Food', label: 'Food' },
  { value: 'Being Fabulous', label: 'Being Fabulous' },
  { value: 'Ken Wheeler', label: 'Ken Wheeler' },
  { value: 'ReasonML', label: 'ReasonML' },
  { value: 'Unicorns', label: 'Unicorns' },
  { value: 'Kittens', label: 'Kittens' },
];

export class MySelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    debugger;
    this.props.onChange('topics', value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur('topics', true);
  };

  render() {
    return (
      <div style={{ margin: '1rem 0' }}>
        <label htmlFor='color'>HereLaurel (select at least 3) </label>
        <Select
          id='color'
          options={options}
          multi={true}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error && this.props.touched && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>
            {this.props.error}
          </div>
        )}
      </div>
    );
  }
}

const MyEnhancedForm = formikEnhancer(MyForm);

export default MyEnhancedForm;
