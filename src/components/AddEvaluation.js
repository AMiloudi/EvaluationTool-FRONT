import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import createEvaluation from '../actions/evaluations/create'

const Style = {
hintText:
{color: 'black'}
}

class AddEvaluation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  submitEvaluation(event) {
    event.preventDefault()

    const evaluation = {
      studentId: this.props.studentId,
      remarks: this.refs.remarks.getValue(),
      color: this.refs.color.getValue(),
      evalDate: this.refs.evalDate.getValue()
    }


    this.props.createEvaluation(evaluation)
    this.refs.form.reset()
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="Form" style={{textAlign:'center', marginTop:'4rem'}}>
      <h2>Add Evalation</h2>
      <form onSubmit={this.submitEvaluation.bind(this)} ref="form">
       <h3> Fill in red, yellow or green</h3>
      <div className="input">
      <TextField ref= "color" type= "text" hintText="red, green or yellow" style={Style.hintText} />
      </div>
        <div className="input">
          <TextField ref= "evalDate" type= "date" hintText="Evaluation for date:" style={Style.hintText} />
        </div>
      <div className="input">
      <TextField ref= "remarks" type="text" style={Style.hintText} />
      </div>
      <FlatButton
      onClick={ this.submitEvaluation.bind(this) }
      label="add Evaluation"
      />
      </form>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createEvaluation })(AddEvaluation)
