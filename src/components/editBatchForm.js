import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import updateBatch from '../actions/batches/edit'
import {grey500} from 'material-ui/styles/colors';

const hintTextStyle = {
  color: grey500
}
class editBatchForm extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  editBatch(event) {
    event.preventDefault()
    const batch = {
      classNumber: this.refs.classNumber.getValue(),
      startDate: this.refs.startDate.getValue(),
      endDate: this.refs.endDate.getValue(),
    }
    this.props.updateBatch(batch)
    this.refs.form.reset()
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="Form">
        <h2>Edit the batch </h2>
        <form onSubmit={this.editBatch.bind(this)} ref="form">
          <div className="input">
            <TextField ref= "classNumber" type="classNumber" hintText= "Class Number"
            style={styles.hintText}
            />
          </div>
          <h3>Start date of the academy:</h3>
          <div className="input">
            <TextField
            ref="startDate"
            type="date"

            // errorText={ this.state.startDateError}
            />
          </div>
          <h3>End date of the academy:</h3>
          <div className="input">
            <TextField ref="endDate"
            type="date"
                // errorText={ this.state.endDateError}
            />
          </div>
            <FlatButton
            onClick={ this.editBatch.bind(this) }
            label="Create new batch"
            />
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { updateBatch })(editBatchForm)
