import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import {fetchOneStudent} from "../actions/students/fetch";
import fetchEvaluations from "../actions/evaluations/fetch";
import Moment from 'moment'
import FlatButton from "material-ui/FlatButton";
import {Card, CardTitle, CardActions } from 'material-ui/Card';
import deleteEvaluation from "../actions/evaluations/delete";
import AddEvaluation from './AddEvaluation'

class Evaluations extends PureComponent {
  componentWillMount() {
    const studentId= this.props.match.params.studentId
    this.props.fetchOneStudent( studentId)
    this.props.fetchEvaluations(studentId)

  }
  goToEvaluation = ( evaluationId) => event => this.props.push(`/evaluations/${evaluationId}`);
  deleteThisEvaluation = (evaluationId) => event => this.props.deleteEvaluation(`${evaluationId}`);
  renderStudent = (student, index) => {
    return (
      <div key={index}>
      <h1>Student:{student.name}</h1>
      </div>
    )
  }

  renderEvaluation = (evaluation, index) => {
    const studentId = evaluation.studentId
    const evalDate = Moment(evaluation.evalDate).format('d MMM YYYY')
    const color = evaluation.color
    const remarks = evaluation.remarks


    let evaluationStyle= {
      backgroundColor: evaluation.color
    }


    return (
      <div className= "evaluation-card" key={index}>
      <Card>
      <CardTitle style={evaluationStyle}  >
      {`The evaluation is from Date: ${evalDate}`}
      </CardTitle>
      </Card>
      <CardActions>
      <FlatButton label="view" onClick={this.goToEvaluation(evaluation._id)} />
      <FlatButton label="New Evaluation" />
      <FlatButton label="Remove" onClick={this.deleteThisEvaluation(evaluation._id)}/>
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
      < AddEvaluation />
      </div>
    )
  }
}

const mapStateToProps = ({ evaluations, students, match }) => ({ evaluations, students });

export default connect(mapStateToProps, { deleteEvaluation, fetchOneStudent, fetchEvaluations, push })(
  Evaluations );
