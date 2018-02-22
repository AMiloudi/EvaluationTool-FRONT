import React, { PureComponent } from 'react'
import Batches from '../containers/Batches'
import './Lobby.css'

class Lobby extends PureComponent {

  render() {
    return (
      <div className="Batches">
      <Batches/>
      </div>
    )
  }
}

export default Lobby
