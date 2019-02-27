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

import SelectCountry from '../common/SelectCountry';

const investigatorFields = [
  { label: 'First Name', name: 'first-name' },
  { label: 'Last Name', name: 'last-name' },
  { label: 'Email', name: 'email' },
  { label: 'Institution', name: 'institution' },
];

const styles = theme => ({
  root: {
    // flexGrow: 1,
    // display: 'flex',
    margin: '2%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  investigator: {
    margin: '20px 0px',
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

class RenderInvestigators extends React.Component {
  componentDidMount() {
    this.props.fields.push({});
    console.log('fields: ', this.props);
  }
  render() {
    const { fields, classes } = this.props;
    return (
      <div className={classes.root}>
        {fields.map((member, index) => (
          <div key={`${member}.${index}`} className={classes.investigator}>
            <Typography variant='subheading'>
              Investigator #{index + 1}
            </Typography>
            {_.map(investigatorFields, ({ label, name }) => {
              return (
                <div>
                  <Field
                    name={`${member}.${name}`}
                    type='text'
                    component={renderTextField}
                    label={label}
                  />
                </div>
              );
            })}

            <SelectCountry
              name={`${member}.countryCitizenship`}
              label='Country of CitizenShip'
            />
            <SelectCountry
              name={`${member}.countryEmployment`}
              label='Country of Employment'
            />
            <IconButton
              aria-label='Delete'
              onClick={() => fields.remove(index)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}

        <Button
          variant='outlined'
          color='primary'
          onClick={() => fields.push({})}
          className={classes.button}
        >
          Add Investigator
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(RenderInvestigators);
