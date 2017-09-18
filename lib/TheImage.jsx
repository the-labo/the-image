'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import TheImageStyle from './TheImageStyle'
import { TheIcon } from 'the-icon'
import { htmlAttributesFor, eventHandlersFor } from 'the-component-util'

/**
 * Image of the-components
 */
class TheImage extends React.PureComponent {
  constructor (props) {
    super(props)
    const s = this
    s.elm = null
    s.state = {
      loading: true,
      failed: false
    }
  }

  render () {
    const s = this
    const {props, state} = s
    const {
      className,
      children,
      scale,
      width,
      height,
      src,
      alt,
      asLink,
      draggable,
      notFoundMessage
    } = props
    const {loading, failed, actualWidth, actualHeight} = state
    const Wrap = asLink ? 'a' : 'div'
    const asLinkProps = asLink ? {href: src, target: '_blank'} : {}
    return (
      <Wrap {...htmlAttributesFor(props, {except: ['className', 'width', 'height']})}
            {...eventHandlersFor(props, {except: []})}
            className={c('the-image', className, `the-image-${scale}`)}
            style={{width, height}}
            {...asLinkProps}
            ref={(elm) => { s.elm = elm }}
      >
        <div className='the-image-elm'
        >
          {loading && !failed && (
            <div className='the-image-spin'>
              <TheIcon.Spin/>
            </div>
          )}
          {failed && <span className='the-image-failed'>{notFoundMessage}</span>}
          <img className={c('the-image-img', {
            'the-image-img-failed': failed
          })}
               {...{src, alt, draggable}}
               width={actualWidth || width}
               height={actualHeight || height}
               onLoad={(e) => s.handleLoad(e)}
               onError={(e) => s.handleError(e)}
          />
          {children}
        </div>
      </Wrap>
    )
  }

  componentWillReceiveProps (nextProps) {
    const s = this
    let {src} = s.props
    let {src: nextSrc} = s.props
    let isNewSrc = nextSrc && nextSrc !== src
    if (isNewSrc) {
      s.setState({
        loading: true,
        failed: false
      })
    }
  }

  componentWillUnmount () {
    const s = this
    s.setState({loading: false})
  }

  handleLoad (e) {
    const s = this
    let {onError} = s.props
    onError && onError(e)
    const elmRect = s.elm && s.elm.getBoundingClientRect()
    s.setState({
      loading: false,
      actualWidth: elmRect && elmRect.width,
      actualHeight: elmRect && elmRect.height,
    })
  }

  handleError (e) {
    const s = this
    let {onLoad} = s.props
    onLoad && onLoad(e)
    s.setState({loading: true})
  }
}

TheImage.Style = TheImageStyle

TheImage.propTypes = {
  /** Image width */
  width: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  /** Image height */
  height: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  /** How to scale image */
  scale: PropTypes.oneOf([
    'none',
    'fit',
    'fill'
  ]),
  /** Handler for load event */
  onLoad: PropTypes.func,
  /** Handler for failed event */
  onError: PropTypes.func,
  /** Message when not found */
  notFoundMessage: PropTypes.string,
  /** Render as link */
  asLink: PropTypes.bool,
  /** Image draggable */
  draggable: PropTypes.bool
}

TheImage.defaultProps = {
  width: 'auto',
  height: 'auto',
  scale: 'fill',
  onLoad: null,
  onError: null,
  notFoundMessage: 'Not Found',
  asLink: false,
  draggable: false
}

TheImage.displayName = 'TheImage'

export default TheImage
