
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import createBatch from '../../actions/batches/create'
import Title from '../../components/UI/Title'
import darkGrey from '../../styles/theme'

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
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="Form">
        <Title content="Create a new Batch" level={2} />

        <form onSubmit={this.submitBatch.bind(this)}>
        <div className="input">
          <TextField ref= "classNumber" type="classNumber" hintText= "Class Number" />
        </div>
          <div className="input">
                <TextField ref="startDate" type="startDate" hintText= "start date of the Academy"/>
          </div>
          <div className="input">
          <TextField ref="endDate" type="endDate" hintText= "end date of the Academy" />
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
