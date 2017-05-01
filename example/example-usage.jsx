'use strict'

import React from 'react'
import { TheImage, TheImageStyle } from 'the-image'

const IMAGE_URL = 'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/01.jpg'

class ExampleComponent extends React.PureComponent {
  render () {
    const width = 120
    const height = 120
    return (
      <div>
        <TheImageStyle/>
        <TheImage {...{ width, height }} src={IMAGE_URL} scale='none'/>
        <TheImage {...{ width, height }} src={IMAGE_URL} scale='fill'/>
        <TheImage {...{ width, height }} src={IMAGE_URL} scale='fit'/>
        <TheImage {...{ width, height }} src={'__invalid_url__'}/>
      </div>

    )
  }
}

export default ExampleComponent
