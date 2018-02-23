import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import {fetchOneBatch} from "../actions/batches/fetch";
import fetchStudents from "../actions/students/fetch";
import {fetchBatchEvaluations} from '../actions/evaluations/fetch';
import CreateStudentButton from './CreateStudentButton'
import deleteStudent from "../actions/students/delete";
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star';
import DeleteButton from 'material-ui/svg-icons/action/delete';
import ViewButton from 'material-ui/svg-icons/action/view-column';
import AskQuestion from './AskQuestion';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 600,
    overflowY: 'auto',
  }
};

class Students extends PureComponent {
  componentWillMount() {
    const batchId= this.props.match.params.batchId
    this.props.fetchOneBatch(batchId)
    this.props.fetchStudents(batchId)
    this.props.fetchBatchEvaluations(batchId)
  }

  goToStudent = ( studentId) => event => this.props.push(`/students/${studentId}/evaluations`);

  deleteThisStudent = (studentId) => event => this.props.deleteStudent(`${studentId}`);

  renderBatch = (batch, index) => {
    return (
      <div key={index}>
      <h1>Class: {batch.classNumber}</h1>
      </div>
    )
  }

  getCurrentColor = (studentId) => {
    let studentEvaluations = (this.props.evaluations.filter(evaluation => evaluation.studentId === studentId))

    studentEvaluations.sort(function(a,b){
      return new Date(a.evalDate) - new Date(b.evalDate);
    });

    let color = "red"
    studentEvaluations.map((evaluation) => {
      if(evaluation.studentId === studentId) {
        color = evaluation.color
      }
    })

    return color
  }

  renderStudent = (student, index) => {
    const name = student.name
    const picture = student.picture
    const color = this.getCurrentColor(student._id)

    return (
      <GridTile key={index} subtitle={
      <div><ViewButton color="white" onClick={this.goToStudent(student._id)}/>
      <DeleteButton color="white" onClick={this.deleteThisStudent(student._id)}/></div>}
      title={name} actionIcon={<IconButton><StarBorder color={color} /></IconButton>}>
      <img src={picture} alt="student"/>
      </GridTile>
    )
  }

  render(){
    const {students, batches} = this.props

    return (
      <div>
        {batches.map(this.renderBatch)}
        <AskQuestion students={this.props.students} evaluations={this.props.evaluations} getCurrentColor={this.getCurrentColor} />
        <div style={styles.root}>
          <GridList cols={4} cellHeight={180} style={styles.gridList}>
          <Subheader>Students</Subheader>
          {students.map(this.renderStudent.bind(this))}
          </GridList>
          <CreateStudentButton  batchId={this.props.match.params.batchId}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({students, batches, evaluations, match}) => ({ students, batches, evaluations });

export default connect(mapStateToProps, { deleteStudent, fetchStudents, fetchBatchEvaluations, fetchOneBatch, push })(
  Students
);
