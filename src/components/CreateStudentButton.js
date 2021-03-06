
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import createStudent from '../actions/students/create'
import {grey500} from 'material-ui/styles/colors';

const hintTextStyle = {
  color: grey500
}
class CreateStudentButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  submitStudent(event) {
    event.preventDefault()
    const student = {
      batchId: this.props.batchId,
      name: this.refs.name.getValue(),
      picture: this.refs.picture.getValue(),
    }
    this.props.createStudent(student)
    this.refs.form.reset()
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="Form">
        <h2>Add Student</h2>
        <form onSubmit={this.submitStudent.bind(this)} ref="form">
          <div className="input">
            <TextField ref= "name" type="name" hintText= "First and Lastname" style={hintTextStyle}/>
          </div>
          <div className="input">
            <TextField ref= "picture" type="picture" hintText= "Link to Picture of student" style={hintTextStyle} />
          </div>
            <FlatButton
            onClick={ this.submitStudent.bind(this) }
            label="add Student"
            />
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createStudent })(CreateStudentButton)
