import React from 'react'
import { shallow } from 'enzyme'
import Title from './Batches'

describe('<Batches/>', () => {
  describe('remove', () => {
    it('Renders batches', function() => {
      let doc = shallow(<Batches {...props})
      let batches = doc.find(batches)
      expect(batches.props().batches).to.equal(props.batches)
    })
  })
})
