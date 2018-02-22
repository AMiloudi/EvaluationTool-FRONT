import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import {fetchOneStudent} from "../actions/students/fetch";
import fetchEvaluations from "../actions/evaluations/fetch";
import FlatButton from "material-ui/FlatButton";
import {Card, CardTitle, CardActions } from 'material-ui/Card';


class Evaluations extends PureComponent {
  componentWillMount() {
    const studentId= this.props.match.params.studentId
    this.props.fetchOneStudent(studentId)
    this.props.fetchEvaluations(studentId)
}

    renderStudent = (student, index) => {
      return (
        <div>
          <h1>Student: {student.name}</h1>
        </div>
      )
    }

  renderEvaluation = (evaluation, index) => {
    const studentId = evaluation.studentId
    const evalDate = evaluation.evalDate
    const color = evaluation.color
    const remarks = evaluation.remarks

    return (
      <div className= "evaluation-card">
      <Card>
        key={index}
        <CardTitle>
        {`The evaluation is ${color} `} {` on Date: ${evalDate}`}
        </CardTitle>
      </Card>
      <CardActions>
        <FlatButton label="View" />
        <FlatButton label="Edit" />
        <FlatButton label="Remove"/>
      </CardActions>
      </div>
    )
  }

  render(){
    const {students, evaluations} = this.props
    return (
      <div>
      {students.map(this.renderStudent)}
      <h5>All evaluations for this Student</h5>
      {evaluations.map(this.renderEvaluation)}
      </div>
    )
  }
}

const mapStateToProps = ({ evaluations, students, match }) => ({ evaluations, students });

export default connect(mapStateToProps, { fetchOneStudent, fetchEvaluations, push })(
  Evaluations );
