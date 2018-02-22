import {
  FETCHED_EVALUATIONS,
  FETCHED_ONE_EVALUATION } from '../actions/evaluations/fetch'
  import { EVALUATION_REMOVED } from '../actions/evaluations/delete'
  import { EVALUATION_CREATED } from '../actions/evaluations/create'
  import { EVALUATION_UPDATED } from '../actions/evaluations/edit'

  export default (state = [], { type, payload } = {}) => {
    switch (type) {
      case FETCHED_EVALUATIONS :
      return [ ...payload ]

      case FETCHED_ONE_EVALUATION :
      return [{ ...payload }]

      case EVALUATION_CREATED :
      const newEvaluation = { ...payload }
      return [newEvaluation].concat(state)

      case EVALUATION_UPDATED :
      return state.map((evaluation) => {
        if (evaluation._id === payload._id) {
          return { ...payload }
        }
        return evaluation
      })

      case EVALUATION_REMOVED :
      return state.filter((evaluation) => (evaluation._id !== payload._id))


      default :
      return state
    }
  }
