import React, { PureComponent } from 'react'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog'
import StarBorder from 'material-ui/svg-icons/toggle/star';

class AskQuestion extends PureComponent {

   state = {
     open: false,
     studentname: null,
     color: null
   };

   handleOpen = () => {
     this.setState({open: true});
   };

   handleClose = () => {
     this.setState({open: false});
   };

  pickRandomStudent(event) {
    event.preventDefault();

    const {students} = this.props

    const red = []
    const yellow = []
    const green = []

    students.map((student) => {
      color = this.props.getCurrentColor(student._id)
      if(color === "red"){ red.push(student) }
      if(color === "yellow"){ yellow.push(student) }
      if(color === "green"){ green.push(student) }
    })

    let redNumber = 0
    let yellowNumber = 0
    let greenNumber = 0

    if(red.length > 0 && yellow.length > 0 && green.length > 0){ redNumber = 49; yellowNumber = 33; greenNumber = 18; } // 100
    if(red.length > 0 && yellow.length > 0 && green.length === 0){ redNumber = 60; yellowNumber = 40; greenNumber = 0; } // (49 / (49 + 33)) * 100 = 60
    if(red.length > 0 && yellow.length === 0 && green.length > 0){ redNumber = 73; yellowNumber = 0; greenNumber = 27; } // (49 / (49 + 18)) * 100 = 73
    if(red.length === 0 && yellow.length > 0 && green.length > 0){ redNumber = 0; yellowNumber = 65; greenNumber = 35; } // (33 / (33 + 18)) * 100 = 65

    if(red.length > 0 && yellow.length === 0 && green.length === 0){ redNumber = 100; yellowNumber = 0; greenNumber = 0; } // There is only red
    if(red.length === 0 && yellow.length > 0 && green.length === 0){ redNumber = 0; yellowNumber = 100; greenNumber = 0; } // There is only yellow
    if(red.length === 0 && yellow.length === 0 && green.length > 0){ redNumber = 0; yellowNumber = 0; greenNumber = 100; } // There is only green


    let randomNumber = Math.floor(Math.random() * 100 )-1;

    let student = null
    let color = null
    if(redNumber !== 0 && randomNumber <= redNumber) {
      student = red[Math.floor(Math.random() * red.length)];
      color = "red"
    } else if(yellowNumber !== 0 && randomNumber <= yellowNumber + redNumber && randomNumber > redNumber) {
      student = yellow[Math.floor(Math.random() * yellow.length)];
      color = "yellow"
    } else {
      student = green[Math.floor(Math.random() * green.length)];
      color = "green"
    }

    this.setState({open: true, studentname: student.name, color: color});
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Ask a question!" onClick={this.pickRandomStudent.bind(this)} />
        <Dialog
          title="Ask a question!"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          The question should be asked to {this.state.studentname} <StarBorder color={this.state.color} />
        </Dialog>
      </div>
    )
  }
}

export default AskQuestion
