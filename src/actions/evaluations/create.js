import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const EVALUATION_CREATED = 'EVALUATION_CREATED'

const api = new API()

export default ({ studentId, evalDate, color, remarks}) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post(`/students/${studentId}/evaluations`, {evalDate, color, remarks})
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({type: EVALUATION_CREATED, payload: result.body })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
