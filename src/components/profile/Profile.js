import React from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { compose } from 'redux';
import EditExpertAreasForm from './EditExpertAreasForm';
import EditAboutForm from './EditAboutForm';

import requireAuth from '../requireAuth';
const styles = theme => ({
  root: {
    // flexGrow: 1,
    // display: 'flex',
    margin: '2%'
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary
  },
  bigAvatar: {
    margin: 'auto',
    width: 60,
    height: 60
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) !important',
    backgroundColor: 'white'
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editExpertise: false,
      editAbout: false
    };
    this.editExpertise = this.editExpertise.bind(this);
    this.editAbout = this.editAbout.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleClose() {
    // console.log('closing: ', this.state);
    this.setState({ editExpertise: false, editAbout: false });
  }

  editExpertise() {
    // console.log('editing');
    this.setState({ editExpertise: true });
  }

  editAbout() {
    // console.log(this.state);
    this.setState({ editAbout: true });
  }

  handleSave(type, values) {
    console.log('saving: ', { [type]: values });
  }

  render() {
    const { classes, user, expertAreas } = this.props;
    console.log({ user });

    const expertAreasWords = [];
    if (expertAreas) {
      expertAreas.map(function(id) {
        // console.log({ id });
        const object = _.find(expertAreas, { _id: id });
        expertAreasWords.push(object.name);
      });

      // expertAreas.map((area) => area);
      // console.log({ expertAreasWords });
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item md={4} sm={12}>
            <Paper className={classes.paper}>
              <Avatar
                alt={user.user && user.user.nameLast}
                src={user.user && user.user.photo}
                className={classes.bigAvatar}
              />
              <Typography variant='h6' color='inherit' align='center' noWrap>
                test
                {user.user && user.user.nameFirst}{' '}
                {user.user && user.user.nameLast}
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={8} sm={12}>
            <Paper className={classes.paper}>
              <Typography variant='h6' color='inherit' noWrap>
                Expert Areas
                <IconButton onClick={this.editExpertise}>
                  <Icon>edit</Icon>
                </IconButton>
              </Typography>
              <Typography>{expertAreasWords.join(', ').toString()}</Typography>

              <Typography variant='h6' color='inherit' noWrap>
                About
                <IconButton onClick={this.editAbout}>
                  <Icon>edit</Icon>
                </IconButton>
              </Typography>
              <Typography>
                {this.props.auth && this.props.auth.about}
              </Typography>

              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={this.state.editExpertise}
                onClose={this.handleClose}
              >
                <div className={classes.modal}>
                  <IconButton
                    style={{ float: 'right' }}
                    onClick={() => this.setState({ editExpertise: false })}
                  >
                    <Icon>close</Icon>
                  </IconButton>

                  <EditExpertAreasForm
                    close={this.handleClose}
                    save={this.handleSave}
                  />
                </div>
              </Modal>

              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={this.state.editAbout}
                onClose={this.handleClose}
              >
                <div className={classes.modal}>
                  <IconButton
                    style={{ float: 'right' }}
                    onClick={() => this.setState({ editAbout: false })}
                  >
                    <Icon>close</Icon>
                  </IconButton>
                  <EditAboutForm
                    close={this.handleClose}
                    save={this.handleSave}
                  />
                </div>
              </Modal>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth: { user }, expertAreas }) => {
  // console.log({ expertAreas });
  return { user, expertAreas };
};

// export default withStyles(styles)(
//   connect(mapStateToProps, requireAuth)(Profile)
// );
export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  requireAuth
)(Profile);
//export default requireAuth(Profile);
