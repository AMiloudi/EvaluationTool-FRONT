import API from '../../api/client'
import {
  LOAD_ERROR,
} from '../loading'

export const EVALUATION_REMOVED = 'EVALUATION_REMOVED'

const api = new API()

export default ( evaluationId) => {
  return (dispatch) => {
    api.delete(`/evaluations/${evaluationId}`)
    .then((result) => {
      dispatch({
        type: EVALUATION_REMOVED,
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
