
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import createBatch from '../actions/batches/create'
import {grey500} from 'material-ui/styles/colors';

const hintTextStyle = {
  color: grey500
}


class CreateBatchButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  submitBatch(event) {
    event.preventDefault()
    const batch = {
      classNumber: this.refs.classNumber.getValue(),
      startDate: this.refs.startDate.getValue(),
      endDate: this.refs.endDate.getValue(),
    }
    this.props.createBatch(batch)

    // this.refs.form.reset()
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="Form">
      <h4>Create a new Batch </h4>
      <form onSubmit={this.submitBatch.bind(this)} ref="form">
      <div className="input">
      <TextField ref= "classNumber" type="classNumber" hintText= "Class Number" style={hintTextStyle}/>
      </div>
      <div className="input">
      <TextField ref="startDate" type="date" hintText= "start date of the Academy" style={hintTextStyle}/>
      </div>
      <div className="input">
      <TextField ref="endDate" type="date" hintText= "end date of the Academy" style={hintTextStyle} />
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
