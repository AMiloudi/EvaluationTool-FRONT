import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import QuestionIcon from 'material-ui/svg-icons/action/assignment-ind'
import Paper from 'material-ui/Paper'
import './askQuestion.css'


class AskQuestion extends PureComponent {

  const rangeNumber = Math.floor(Math.random() * 100) + 1

  if (rangeNumber <= 49){

  }

  if (rangeNumber > 49 && <= 88){

  }

  if (rangeNumber > 88){

  }
  randomStudent(length){
    return Math.floor(Math.random() *length)
  }

  clickButton(students,event){
    let type = this.whatType()
    let selectedStudents = students.filter(s => s.lastReview === type)
    let student =  selectedStudents[this.randomStudent(selectedStudents.length)]
    this.setState({selectedStudent: student})
  }

  render() {
    const students = this.props.students
    return (
      <div className="AskQuestion">
        <RaisedButton
          label="Ask a Question"
          primary={true}
          onClick={this.clickButton.bind(this,students)}
          icon={<QuestionIcon />} />
          <Paper>
          <img src={this.state.selectedStudent.picture} className='questionPic' />
          <p className={this.state.selectedStudent.lastReview}> {this.state.selectedStudent.name}</p>
          </Paper>
      </div>
    )
  }
}


export default connect(null, {  })(AskQuestion)
