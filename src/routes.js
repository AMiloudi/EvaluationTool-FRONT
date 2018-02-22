import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { BatchItem } from './components'
import { Evaluations, EvaluationItem } from './components'
import { Lobby, Batches, SignIn, SignUp} from './containers'


export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Lobby} />
        <Route exact path="/batches" component={Batches} />
        <Route exact path="/batches/:batchId/students" component={BatchItem} />
        <Route exact path="/students/:studentId/evaluations" component={Evaluations} />
        <Route exact path="/students/:studentId/evaluations/:evaluationId" component={EvaluationItem} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    )
  }
}
