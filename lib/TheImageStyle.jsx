'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TheStyle from 'the-style'
import { asStyleData } from 'the-component-util'

/** Style for TheImage */
const TheImageStyle = ({id, className, options}) => (
  <TheStyle {...{id}}
            className={classnames('the-image-style', className)}
            styles={TheImageStyle.data(options)}
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
  const {ThemeValues} = TheStyle
  let {
    overlayTextColor = ThemeValues.overlayTextColor,
    overlayBackgroundColor = ThemeValues.overlayBackgroundColor,
    lightBackgroundColor = ThemeValues.lightBackgroundColor,
    lightTextColor = ThemeValues.lightTextColor,
  } = options
  return asStyleData('.the-image', {
    '&': {
      position: 'relative',
      display: 'inline-block',
      backgroundColor: lightBackgroundColor,
      overflow: 'hidden'
    },
    '.the-image-inner': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 'auto',
      height: 'auto',
      overflow: 'hidden'
    },
    '.the-image-spinner': {
      position: 'absolute',
      zIndex: 1,
      color: lightTextColor,
      backgroundColor: overlayBackgroundColor,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '.the-icon-spin': {
        fontSize: 'larger'
      }
    },
    '.the-image-img': {},
    '.the-image-failed': {
      color: lightTextColor,
      textAlign: 'center'
    },
    '.the-image-img-failed': {
      opacity: 0,
      visibility: 'hidden'
    },
    '&.the-image-fill': {
      '.the-image-img': {
        objectFit: 'cover',
        minWidth: '100%',
        minHeight: '100%'
      }
    },
    '&.the-image-fit': {
      '.the-image-img': {
        objectFit: 'scale-down',
        maxWidth: '100%',
        maxHeight: '100%'
      }
    }
  })
}

export default TheImageStyle
