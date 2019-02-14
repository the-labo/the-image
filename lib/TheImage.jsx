'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheIcon } from 'the-icon'

/**
 * Image of the-components
 */
class TheImage extends React.Component {
  constructor(props) {
    super(props)
    this.elmRef = React.createRef()
    this.state = {
      failed: false,
      loading: true,
    }
    this.resize = this.resize.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
    this.resizeTimer = -1
  }

  componentDidMount() {
    const { resizeInterval } = this.props
    if (resizeInterval > 0) {
      this.resizeTimer = setInterval(this.resize, resizeInterval)
    }
  }

  componentDidUpdate(prevProps) {
    const { src: prevSrc } = prevProps
    const { src: src } = this.props
    const isNewSrc = src && src !== prevSrc
    if (isNewSrc) {
      this.setState({
        failed: false,
        loading: true,
      })
    }
  }

  componentWillUnmount() {
    this.setState({ loading: false })
    clearTimeout(this.resizeTimer)
  }

  handleError(e) {
    const { onError } = this.props
    onError && onError(e)
    this.setState({ failed: true, loading: false })
  }

  handleLoad(e) {
    const { onLoad } = this.props
    onLoad && onLoad(e)
    this.setState({ loading: false })
    this.resize()
  }

  render() {
    const { props, state } = this
    const {
      alt,
      asLink,
      background,
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
    const { actualHeight, actualWidth, failed, loading } = state
    const Wrap = asLink ? 'a' : 'div'
    const asLinkProps = asLink ? { href: src, target: '_blank' } : {}
    const spinning = !!src && loading && !failed
    const notFound = !loading && (failed || !src)
    return (
      <Wrap
        {...htmlAttributesFor(props, {
          except: ['className', 'width', 'height', 'src', 'draggable'],
        })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-image', className, `the-image-${scale}`)}
        style={Object.assign({}, style || {}, { background, height, width })}
        {...asLinkProps}
        aria-busy={spinning}
        ref={this.elmRef}
      >
        <div className='the-image-inner'>
          {spinning && (
            <div className='the-image-spin'>
              <TheIcon.Spin />
            </div>
          )}
          {notFound ? (
            <span className='the-image-notfound'>{notFoundMessage}</span>
          ) : (
            <img
              className={c('the-image-img', {
                'the-image-img-failed': failed,
              })}
              {...{ alt, draggable, src }}
              height={actualHeight || height}
              onError={this.handleError}
              onLoad={this.handleLoad}
              width={actualWidth || width}
            />
          )}
          {children}
        </div>
      </Wrap>
    )
  }

  resize() {
    const elm = this.elmRef.current
    if (!elm) {
      return
    }
    const elmRect = elm.getBoundingClientRect()
    const { actualHeight, actualWidth, loading } = this.state
    if (loading) {
      return
    }

    const newActualWidth = elmRect && elmRect.width
    const newActualHeight = elmRect && elmRect.height
    const skip =
      actualWidth === newActualWidth && actualHeight === newActualHeight
    if (skip) {
      return
    }
    this.setState({
      actualHeight: newActualHeight,
      actualWidth: newActualWidth,
    })
  }
}

TheImage.propTypes = {
  /** Image width */
  /** Render as link */
  asLink: PropTypes.bool,
  /** Image draggable */
  draggable: PropTypes.bool,
  /** Image height */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Message when not found */
  notFoundMessage: PropTypes.string,
  /** Handler for failed event */
  onError: PropTypes.func,
  /** Handler for load event */
  onLoad: PropTypes.func,
  /** Interval for resize */
  resizeInterval: PropTypes.number,
  /** How to scale image */
  scale: PropTypes.oneOf(['none', 'fit', 'fill']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

TheImage.defaultProps = {
  asLink: false,
  background: 'transparent',
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
