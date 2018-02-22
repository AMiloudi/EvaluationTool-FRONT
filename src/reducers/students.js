import {
  FETCHED_ALL_STUDENTS,
  FETCHED_ONE_STUDENT } from '../actions/students/fetch'
  import { STUDENT_CREATED } from '../actions/students/create'
  import { STUDENT_REMOVED } from '../actions/students/delete'
  import { STUDENT_UPDATED } from '../actions/students/edit'

  export default (state = [], { type, payload } = {}) => {
    switch (type) {
      case FETCHED_ALL_STUDENTS :
      return [ ...payload ]

      case FETCHED_ONE_STUDENT :
      return [{ ...payload }]

      case STUDENT_CREATED :
      const newStudent = { ...payload }
      return [newStudent].concat(state)

      case STUDENT_UPDATED :
      return state.map((student) => {
        if (student._id === payload._id) {
          return { ...payload }
        }
        return student
      })

      case STUDENT_REMOVED :
      return state.filter((student) => (student._id !== payload._id))

      default :
      return state
    }
  }
