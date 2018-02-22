import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import PropTypes from 'prop-types'
import {fetchOneBatch} from "../actions/batches/fetch";
import fetchStudents from "../actions/students/fetch";
import FlatButton from "material-ui/FlatButton";
import {Card, CardTitle, CardMedia, CardActions } from 'material-ui/Card';



class BatchItem extends PureComponent {

  componentWillMount() {
    const batchId= this.props.match.params.batchId
    this.props.fetchOneBatch(batchId)
    this.props.fetchStudents(batchId)
  }

  goToStudent = (batchId, studentId) => event => this.props.push(`/batches/${batchId}/students/${studentId}`);


  renderBatch = (batch, index) => {
    return (
      <div>
        <h1>Class: {batch.classNumber}</h1>
      </div>
    )
  }

  renderStudent = (student, index) => {
    const name = student.name
    const picture = student.picture

    return (
      <div className= "student-card">
      <Card>
      key={index}
      <CardTitle>
      {`Student: ${name} `}
      </CardTitle>
      <CardMedia>
      <img src={`${picture}`} alt="student"/>
      </CardMedia>
      <CardActions>
      <FlatButton label="View" onClick={this.goToStudent(student._id)} />
      <FlatButton label="Edit"   />
      <FlatButton label="Remove" />
      </CardActions>
      </Card>
      </div>
    )
  }

  render(){
    const {students, batches} = this.props

    return (
      <div>
      {batches.map(this.renderBatch)}
      <h3>students</h3>
      {students.map(this.renderStudent)}
      </div>
    )
  }
}

const mapStateToProps = ({students, batches, match}) => ({ students, batches });

export default connect(mapStateToProps, { fetchStudents, fetchOneBatch, push })(
  BatchItem
);
