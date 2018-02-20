// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches, { fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateBatchButton from '../components/batches/CreateBatchButton'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
    this.props.subscribeToWebsocket()
  }

  goToBatch = batchId => event => this.props.push(`/view/${batchId}`)

  isStudent(batch) {
    if (!this.props.currentUser) { return false }
    return batch.students.map(s => s.userId)
      .indexOf(this.props.currentUser._id) >= 0
  }

  renderBatch = (batch, index) => {
    if (!batch.students[0].name) { this.props.fetchStudents(batch) }

    // const title = game.players.map(p => (p.name || null))
    //   .filter(n => !!n)
    //   .join(' vs ')

    return (
      <MenuItem
        key={index}
        onClick={this.goToBatch(batch._id)}
        />
    )
  }

  render() {
    return (
      <div className="Batches">
        <h1>Current Batches!</h1>
        <CreateBatchButton />
        <Paper className="paper">
          <Menu>
            {this.props.batches.map(this.renderBatch)}
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches, currentUser })

export default connect(mapStateToProps, { fetchBatches, subscribeToWebsocket, fetchStudents, push })(Lobby)
