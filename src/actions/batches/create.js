import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const BATCH_CREATED = 'BATCH_CREATED'

const api = new API()

export default ({classNumber, startDate, endDate}) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/batches', {classNumber, startDate, endDate})
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({type: BATCH_CREATED, payload: result.body })
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
