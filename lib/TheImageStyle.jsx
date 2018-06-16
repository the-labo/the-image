'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from 'the-component-util'
import { TheStyle } from 'the-style'

/** Style for TheImage */
const TheImageStyle = ({className, id, options}) => (
  <TheStyle {...{id}}
            className={classnames('the-image-style', className)}
            styles={TheImageStyle.data(options)}
  />
)

TheImageStyle.displayName = 'TheImageStyle'
TheImageStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheImageStyle.defaultProps = {
  options: {},
}

TheImageStyle.data = (options) => {
  const {ThemeValues} = TheStyle
  let {
    lightBackgroundColor = ThemeValues.lightBackgroundColor,
    lightTextColor = ThemeValues.lightTextColor,
    overlayBackgroundColor = ThemeValues.overlayBackgroundColor,
    overlayTextColor = ThemeValues.overlayTextColor,
  } = options
  return asStyleData('.the-image', {
    '.the-image-failed': {
      color: lightTextColor,
      textAlign: 'center',
    },
    '.the-image-img': {
      objectFit: 'none',
      transition: 'width 300ms, height 300ms',
    },
    '.the-image-img-failed': {
      opacity: 0,
      visibility: 'hidden',
    },
    '.the-image-inner': {
      alignItems: 'center',
      display: 'flex',
      height: 'auto',
      justifyContent: 'center',
      overflow: 'hidden',
      width: 'auto',
    },
    '.the-image-spin': {
      '.the-icon-spin': {
        fontSize: 'larger',
      },
      alignItems: 'center',
      backgroundColor: overlayBackgroundColor,
      bottom: 0,
      color: lightTextColor,
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      padding: '8px 0',
      position: 'absolute',
      right: 0,
      textAlign: 'center',
      top: 0,
      zIndex: 1,
    },
    '&': {
      backgroundColor: lightBackgroundColor,
      display: 'inline-block',
      overflow: 'hidden',
      position: 'relative',
    },
    '&.the-image-fill': {
      '.the-image-img': {
        minHeight: '100%',
        minWidth: '100%',
        objectFit: 'cover',
      },
    },
    '&.the-image-fit': {
      '.the-image-img': {
        maxHeight: '100%',
        maxWidth: '100%',
        objectFit: 'scale-down',
      },
    },
  })
}

export default TheImageStyle
