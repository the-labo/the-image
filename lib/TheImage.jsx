'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheIcon } from 'the-icon'
import TheImageStyle from './TheImageStyle'

/**
 * Image of the-components
 */
class TheImage extends React.PureComponent {
  constructor (props) {
    super(props)
    this.elm = null
    this.state = {
      failed: false,
      loading: true,
    }
    this.resizeTimer = -1
  }

  componentDidMount () {
    const {resizeInterval} = this.props
    if (resizeInterval > 0) {
      this.resizeTimer = setInterval(() => this.resize(), resizeInterval)
    }
  }

  componentWillReceiveProps (nextProps) {
    const {src} = this.props
    const {src: nextSrc} = this.props
    const isNewSrc = nextSrc && nextSrc !== src
    if (isNewSrc) {
      this.setState({
        failed: false,
        loading: true,
      })
    }
  }

  componentWillUnmount () {
    this.setState({loading: false})
    clearTimeout(this.resizeTimer)
  }

  handleError (e) {
    const {onError} = this.props
    onError && onError(e)
    this.setState({loading: false})
  }

  handleLoad (e) {
    const {onLoad} = this.props
    onLoad && onLoad(e)
    this.setState({loading: false})
    this.resize()
  }

  render () {
    const {props, state} = this
    const {
      alt,
      asLink,
      children,
      className,
      draggable,
      height,
      notFoundMessage,
      scale,
      src,
      style,
      width,
    } = props
    const {actualHeight, actualWidth, failed, loading} = state
    const Wrap = asLink ? 'a' : 'div'
    const asLinkProps = asLink ? {href: src, target: '_blank'} : {}
    const spinning = !!src && loading && !failed
    return (
      <Wrap {...htmlAttributesFor(props, {except: ['className', 'width', 'height']})}
            {...eventHandlersFor(props, {except: []})}
            className={c('the-image', className, `the-image-${scale}`)}
            style={Object.assign({}, style || {}, {height, width})}
            {...asLinkProps}
            aria-busy={spinning}
            ref={(elm) => { this.elm = elm }}
      >
        <div className='the-image-elm'
        >
          {spinning && (
            <div className='the-image-spin'>
              <TheIcon.Spin/>
            </div>
          )}
          {failed && <span className='the-image-failed'>{notFoundMessage}</span>}
          <img className={c('the-image-img', {
            'the-image-img-failed': failed,
          })}
               {...{alt, draggable, src}}
               height={actualHeight || height}
               onError={(e) => this.handleError(e)}
               onLoad={(e) => this.handleLoad(e)}
               width={actualWidth || width}
          />
          {children}
        </div>
      </Wrap>
    )
  }

  resize () {
    const s = this
    const elmRect = s.elm && s.elm.getBoundingClientRect()
    const {actualHeight, actualWidth, loading} = s.state
    if (loading) {
      return
    }

    const newActualWidth = elmRect && elmRect.width
    const newActualHeight = elmRect && elmRect.height
    const skip = (actualWidth === newActualWidth) && (actualHeight === newActualHeight)
    if (skip) {
      return
    }
    s.setState({
      actualHeight: newActualHeight,
      actualWidth: newActualWidth,
    })
  }
}

TheImage.Style = TheImageStyle

TheImage.propTypes = {
  /** Image width */
  /** Render as link */
  asLink: PropTypes.bool,
  /** Image draggable */
  draggable: PropTypes.bool,
  /** Image height */
  height: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  /** Message when not found */
  notFoundMessage: PropTypes.string,
  /** Handler for failed event */
  onError: PropTypes.func,
  /** Handler for load event */
  onLoad: PropTypes.func,
  /** Interval for resize */
  resizeInterval: PropTypes.number,
  /** How to scale image */
  scale: PropTypes.oneOf([
    'none',
    'fit',
    'fill'
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
}

TheImage.defaultProps = {
  asLink: false,
  draggable: false,
  height: 'auto',
  notFoundMessage: 'Not Found',
  onError: null,
  onLoad: null,
  resizeInterval: -1,
  role: 'image',
  scale: 'fill',
  width: 'auto',
}

TheImage.displayName = 'TheImage'

export default TheImage
