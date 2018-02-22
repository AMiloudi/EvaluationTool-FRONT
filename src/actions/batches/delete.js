import API from '../../api/client'
import {
  LOAD_ERROR,
} from '../loading'

export const BATCH_REMOVED = 'BATCH_REMOVED'

const api = new API()

export default (batchId) => {
  return (dispatch) => {
    api.delete(`/batches/${batchId}`)
    .then((result) => {
      dispatch({
        type: BATCH_REMOVED,
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
