'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TheStyle from 'the-style'
import { asStyleData } from 'the-component-util'

/** Style for TheImage */
const TheImageStyle = ({ id, className, options }) => (
  <TheStyle { ...{ id } }
            className={ classnames('the-image-style', className) }
            styles={ TheImageStyle.data(options) }
  />
)

TheImageStyle.displayName = 'TheImageStyle'
TheImageStyle.propTypes = {
  /** Style options */
  options: PropTypes.object
}

TheImageStyle.defaultProps = {
  options: {}
}

TheImageStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  let {
    overlayBackgroundColor = ThemeValues.overlayBackgroundColor
  } = options
  return asStyleData('.the-image', {
    '&': {
      position: 'relative',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    '.the-image-spinner': {
      position: 'absolute',
      zIndex: 1,
      backgroundColor: overlayBackgroundColor,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    '.the-image-img': {},
    '&.the-image-fill': {
      '.the-image-img': {
        minWidth: '100%',
        minHeight: '100%'
      }
    },
    '&.the-image-fit': {
      '.the-image-img': {
        maxWidth: '100%',
        maxHeight: '100%'
      }
    }
  })
}

export default TheImageStyle
