'use strict'

import React from 'react'
import { TheImage, TheImageStyle } from 'the-image'

const IMAGE_URL = 'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/01.jpg'

class ExampleComponent extends React.PureComponent {
  render () {
    return (
      <div>
        <TheImageStyle/>
        <TheImage src={IMAGE_URL}/>
        <TheImage src={IMAGE_URL} scale='fill'/>
        <TheImage src={IMAGE_URL} scale='fit'/>
      </div>

    )
  }
}

export default ExampleComponent
