import React from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//Field will provide values, handleChange, handleBlur
//FOrm gives you handleChange, handleSubmit
const initialValues = { friends: [{ name: '', email: '' }] };

const Invitation = () => {
  return (
    <div>
      <h1>Invite Friends</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          friends: Yup.array().of(
            Yup.object({
              name: Yup.string().required('Email required.'),
              email: Yup.string()
                .email('Invalid email.')
                .required('Required email'),
            }),
          ),
        })}
        onSubmit={values => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {props => {
          const { values, errors, touched, isSubmitting } = props;
          return (
            <Form>
              <FieldArray name='friends'>
                {({ push, remove }) => {
                  return (
                    <React.Fragment>
                      {values.friends &&
                        values.friends.length > 0 &&
                        values.friends.map((friend, index) => (
                          <div className='row'>
                            <div className='col'>
                              <Field name={`friends[${index}].name`}>
                                {({ field, form }) => {
                                  console.log({ field });
                                  console.log({ form });
                                  return (
                                    <input
                                      {...field}
                                      type='text'
                                      placeholder='Jane'
                                    />
                                  );
                                }}
                              </Field>
                              <ErrorMessage name={`friends[${index}].name`}>
                                {msg => <div>{msg}</div>}
                              </ErrorMessage>
                            </div>
                            <div className='col'>
                              <Field
                                name={`friends[${index}].email`}
                                type='email'
                              />
                              <ErrorMessage name={`friends[${index}].email`}>
                                {msg => <div>{msg}</div>}
                              </ErrorMessage>
                            </div>
                            <div className='col'>
                              <button
                                type='button'
                                onClick={() => remove(index)}
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}
                      <button
                        type='button'
                        disabled={isSubmitting}
                        onClick={() => push({ name: '', email: '' })}
                      >
                        Add Friend
                      </button>
                    </React.Fragment>
                  );
                }}
              </FieldArray>
              <button type='submit' disabled={isSubmitting}>
                Invite
              </button>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

//PROPS YOU GET FROM FORMIK
// {
//   "values": {
//     "friends": [
//       {
//         "name": "",
//         "email": ""
//       }
//     ]
//   },
//   "errors": {},
//   "touched": {},
//   "isSubmitting": false,
//   "isValidating": false,
//   "submitCount": 0,
//   "dirty": false,
//   "isValid": false,
//   "initialValues": {
//     "friends": [
//       {
//         "name": "",
//         "email": ""
//       }
//     ]
//   },
//   "validateOnChange": true,
//   "validateOnBlur": true
// }
export default Invitation;
