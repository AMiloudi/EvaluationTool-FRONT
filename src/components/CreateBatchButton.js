
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import createBatch from '../actions/batches/create'
import {grey500} from 'material-ui/styles/colors';

const styles = {
  hintText: {
    color:grey500
  }
};

class CreateBatchButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  submitBatch(event) {
    event.preventDefault()
    if (this.validateAll()){
      const batch = {
        classNumber: this.refs.classNumber.getValue(),
        startDate: this.refs.startDate.getValue(),
        endDate: this.refs.endDate.getValue(),
      }
      this.props.createBatch(batch)

      this.refs.form.reset()
    }
    return false
  }
  validateAll() {
    return this.validateclassNumber() &&
    this.validatestartDate() &&
    this.validateEndDate()
  }

  validateclassNumber() {
    const { classNumber } = this.refs

    if (classNumber.getValue().length >= 1) {
      this.setState({
        classNumberError: null
      })
      return true
    }

    this.setState({
      classNumberError: 'Please write down a number'
    })
    return false
  }

  validatestartDate() {
    const { startDate } = this.refs

    if (startDate.getValue().length >= 1) {
      this.setState({
        startDateError: null
      })
      return true
    }

    this.setState({
      startDateError: 'Please pick a date'
    })
    return false
  }

  validateEndDate() {
    const { endDate } = this.refs

    if (endDate.getValue().length >=1) {
      this.setState({
        endDateError: null
      })
      return true
    }

    this.setState({
      endDateError: 'Please pick a date'
    })
    return false
  }



  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="Form">
        <h2>Add Batch</h2>
        <form onSubmit={this.submitBatch.bind(this)} ref="form">
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
            onChange={this.validatestartDate.bind(this)}
            // errorText={ this.state.startDateError}
            />
          </div>
          <h3>End date of the academy:</h3>
          <div className="input">
            <TextField ref="endDate"
            type="date"
            onChange={this.validateEndDate.bind(this)}
            // errorText={ this.state.endDateError}
            />
          </div>
            <FlatButton
            onClick={ this.submitBatch.bind(this) }
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

export default connect(mapStateToProps, { createBatch })(CreateBatchButton)
