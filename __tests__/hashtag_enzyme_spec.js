import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Hashtag from '../src/components/hashtag.jsx'

Enzyme.configure({ adapter: new Adapter() })

describe('Hashtag', () => {
  it('Hashtag renders hello world', () => {
      const hashtagsList = [ '#FelizJueves',
      '#OhMy2ndWin',
      '#ThursdayThoughts',
      '#DíaDeLosAbuelos',
      '#ElectionResults2018',
      'Ceuta',
      'Enzo Roco',
      'Vietto',
      'Mick Jagger',
      'Adil Rashid' ]

    const list = Enzyme.shallow(<Hashtag hashtags={hashtagsList}/>)
  })
})
