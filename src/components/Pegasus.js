import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm, FieldArray } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import SelectCountry from './common/SelectCountry';
import RenderInvestigators from './2019pegasus/RenderInvestigators';
const axios = require('axios');
const uuidv1 = require('uuid/v1');

const styles = theme => ({
  root: {
    // flexGrow: 1,
    // display: 'flex',
    margin: '2%',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    margin: theme.spacing(1),
  },
});

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const investigatorFields = [
  { label: 'First Name', name: 'first-name' },
  { label: 'Last Name', name: 'last-name' },
  { label: 'Email', name: 'email' },
  { label: 'Institution', name: 'institution' },
];

class Pegasus extends Component {
  onSubmit = formValues => {
    //formValues passed to this from redux form this.props.handelSubmit
    console.log({ formValues });
    // this.props.onSubmit(formValues);
  };

  render() {
    console.log('props: ', this.props);
    console.log('state: ', this.state);
    // console.log('environment: ', process.env.NODE_ENV);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form
          id='pegasusForm'
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            name='proposalTitle'
            component={renderTextField}
            label='Proposal Title'
            fullWidth={true}
          />
          <FieldArray name='investigators' component={RenderInvestigators} />
          <Typography variant='subheading'>File Uploads</Typography>
          <p>
            NOTE: Only .pdf files will be accepted. You can use this{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://smallpdf.com/pdf-converter'
            >
              tool
            </a>{' '}
            to convert your files to .pdf format.
          </p>
          {/* <div className='form-group'>
              <label htmlFor='uploadProposal'>Upload your proposal.</label>
              <input
                style={
                  this.state.submitStatus === 'invalidFile'
                    ? { border: '2px dashed red' }
                    : {}
                }
                id='uploadProposal'
                type='file'
                name='uploadProposal'
                accept='application/pdf'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='uploadBudget'>Upload your budget.</label>
              <input
                style={
                  this.state.submitStatus === 'invalidFile'
                    ? { border: '2px dashed red' }
                    : {}
                }
                id='uploadBudget'
                type='file'
                name='uploadBudget'
                accept='application/pdf'
                required
              />
            </div> */}
          <input type='checkbox' name='checkbox' value='check' id='agree' /> By
          submitting this form I agree to research, innovation, sustainability,
          and the Oxford comma.
          <br />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  } //render
} //app

export default withStyles(styles)(
  connect()(
    reduxForm({
      form: 'investigator',
    })(Pegasus),
  ),
);

// export default withStyles(styles)(
//     connect()(
//       reduxForm({
//         form: 'investigator',
//       })(Investigator),
//     ),
//   );
