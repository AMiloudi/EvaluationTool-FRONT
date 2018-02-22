import API from '../../api/client'
import {
  LOAD_ERROR,
} from '../loading'

export const STUDENT_REMOVED = 'STUDENT_REMOVED'

const api = new API()

export default  (studentId) => {
  return (dispatch) => {
    api.delete(`/student/${studentId}`)
    .then((result) => {
      dispatch({
        type: STUDENT_REMOVED,
        payload: result.body
      })
    })
    .catch((error) => {
      dispatch({
        type: LOAD_ERROR,
        payload: error.message
      })
    })
  }
}
