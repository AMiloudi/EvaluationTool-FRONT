import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'

const studentShape = PropTypes.shape({
  studentId: PropTypes.string.isRequired,
  name: PropTypes.string,
  picture: PropTypes.string,
})

class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    fetchStudents: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      studentId: PropTypes.string,
      students: PropTypes.arrayOf(studentShape).isRequired,
      class: PropTypes.number.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    }),
    currentStudent: studentShape,
    isStudent: PropTypes.bool,
  }

  componentWillMount() {
    const { batch, fetchOneBatch, subscribeToWebsocket } = this.props
    const { batchId } = this.props.match.params

    if (!game) { fetchOneGame(gameId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps

    if (batch && !batch.students[0].name) {
      this.props.fetchStudents(batch)
    }
  }

    render() {
    const { batch } = this.props

    if (!batch) return null

    // const title = batch.student.map(s => (s.name || null))
    // .filter(n => !!n)
    // .join(' vs ')

    return (
      <div>
      <h1>Pick Your Class</h1>
      // <p>{title}</p>

      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batch }, { match }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
  const currentStudent = batch && batch.student.filter((s) => (s.userId === currentUser._id))[0]
  return {
    currentStudent,
    batch,
    isStudent: !!currentStudent,
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneBatch,
  fetchStudents,
})(Batch)
