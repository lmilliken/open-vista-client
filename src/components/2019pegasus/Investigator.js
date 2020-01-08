import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FormSection } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import SelectCountry from './SelectCountry';
import { withStyles } from '@material-ui/core/styles';
import CountrySelect from '../common/SelectCountry';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const investigatorFields = [
  { label: 'First Name', name: 'first-name' },
  { label: 'Last Name', name: 'last-name' },
  { label: 'Email', name: 'email' },
  { label: 'Institution', name: 'institution' },
];

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    errorText={touched && error}
    {...input}
    label={label}
    {...custom}
  />
);

class Investigator extends Component {
  // handleChange(index, event) {
  //   // console.log("index in investigator", index)
  //   // console.log("event name", event.target.name)
  //   // console.log("event value", event.target.value)
  //   var field = event.target.name;
  //   var value = event.target.value;
  //   this.props.handleChange(index, field, value);
  // }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className='container applicant'>
        <div className='form-row'>
          {_.map(investigatorFields, ({ label, name }) => {
            return (
              <div>
                <Field key={name} component={renderTextField} label={label} />
              </div>
            );
          })}

          <FormSection name='countryCitizenship'>
            <CountrySelect />
          </FormSection>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(
  connect()(
    reduxForm({
      form: 'investigator',
    })(Investigator),
  ),
);
