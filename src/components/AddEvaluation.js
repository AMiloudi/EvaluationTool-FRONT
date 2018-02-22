import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import CreateEvaluation from '../actions/evaluations/create'
import {grey500} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const hintTextStyle = {
  color: grey500
}

const styles = {
  customWidth: {
    width: 150,
  },
};
class addEvaluation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  submitEvaluation(event) {
    event.preventDefault()
    const evaluation = {
      remarks: this.refs.remarks.getValue(),
      color: this.refs.color.getValue(),
      evalDate: this.refs.evalDate.state.date,
    }
    this.props.CreateEvaluation(evaluation)
    // this.refs.form.reset()
  }
 handleChange = (event, index, value) => this.setState({value});

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="Form">
      <h4>Add a Evaluation</h4>
      <form onSubmit={this.submitEvaluation.bind(this)} ref="form">
      <SelectField
          floatingLabelText="Pick Color"
          // value={this.state.value}
          // onChange={this.handleChange}
          // style={styles.customWidth}
        >
          <MenuItem value={1} primaryText="Red" />
          <MenuItem value={2} primaryText="Yellow" />
          <MenuItem value={3} primaryText="Green" />
           />
        </SelectField>
        <div className="input">
          <DatePicker ref= "evalDate" type="evalDate" hintText="Evaluation for date:" style={hintTextStyle} />
        </div>
      <div className="input">
      <h5> Remarks: </h5>
      <TextField ref= "remarks" type="remarks" style={hintTextStyle} />
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

export default connect(mapStateToProps, { CreateEvaluation })(addEvaluation)
