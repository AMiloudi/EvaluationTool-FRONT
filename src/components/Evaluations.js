import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import {fetchOneStudent} from "../actions/students/fetch";
import fetchEvaluations from "../actions/evaluations/fetch";
import Moment from 'moment'
import FlatButton from "material-ui/FlatButton";
import deleteEvaluation from "../actions/evaluations/delete";
import {Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn }from 'material-ui/Table';
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
    const evalDate = Moment(evaluation.evalDate).format('d MMM YYYY')
    const color = evaluation.color
    const remarks = evaluation.remarks


    let evaluationStyle= {
      backgroundColor: evaluation.color
    }


    return (
      <TableRow style={evaluationStyle} key={index}>
         <TableRowColumn>{evalDate}</TableRowColumn>
         <TableRowColumn>{color}</TableRowColumn>
         <TableRowColumn>{remarks}</TableRowColumn>
         <TableRowColumn>
           <FlatButton label="view" onClick={this.goToEvaluation(evaluation._id)} />
           <FlatButton label="Remove" onClick={this.deleteThisEvaluation(evaluation._id)}/>
         </TableRowColumn>
       </TableRow>
    )
  }

  render(){
    const {students, evaluations} = this.props
    return (
      <div>
       <h3>All evaluations for this Student</h3>
       {students.map(this.renderStudent)}
       <Table>
         <TableHeader>
           <TableRow>
             <TableHeaderColumn>Evaluation Date</TableHeaderColumn>
             <TableHeaderColumn>Color</TableHeaderColumn>
             <TableHeaderColumn>Remarks</TableHeaderColumn>
             <TableHeaderColumn>Actions</TableHeaderColumn>
           </TableRow>
         </TableHeader>
         <TableBody>
             {evaluations.map(this.renderEvaluation)}
         </TableBody>
       </Table>
        <AddEvaluation  studentId={this.props.match.params.studentId}/>
 </div>
    )
  }
}

const mapStateToProps = ({ evaluations, students, match }) => ({ evaluations, students });

export default connect(mapStateToProps, { AddEvaluation, deleteEvaluation, fetchOneStudent, fetchEvaluations, push })(
  Evaluations );
