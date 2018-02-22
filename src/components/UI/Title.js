import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Title extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
  }

render() {
    return(
      <h2>
        { this.props.content }
      </h2>
    )
  }
}

export default Title
