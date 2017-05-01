'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
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
    s.state = {
      loading: true,
      failed: false
    }
  }

  render () {
    const s = this
    const { props, state } = s
    let {
      className,
      children,
      scale,
      width,
      height,
      src,
      alt,
      notFoundMessage
    } = props
    let { loading, failed } = state
    return (
      <div { ...htmlAttributesFor(props, { except: [ 'className' ] }) }
           { ...eventHandlersFor(props, { except: [] })}
           className={ classnames('the-image', className, `the-image-${scale}`) }
           style={{ width, height }}
      >
        <div className='the-image-inner'>
          {loading && !failed && (
            <div className='the-image-spinner'>
              <TheIcon.Spin />
            </div>
          )}
          {failed && <span className='the-image-failed'>{notFoundMessage}</span>}
          <img className={classnames('the-image-img', {
            'the-image-img-failed': failed
          })}
               src={src}
               alt={alt}
               width={width}
               height={height}
               onLoad={(e) => s.handleLoad(e)}
               onError={(e) => s.handleError(e)}
          />
          { children }
        </div>
      </div>
    )
  }

  componentWillReceiveProps (nextProps) {
    const s = this
    let { src } = s.props
    let { src: nextSrc } = s.props
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
    s.setState({ loading: false })
  }

  handleLoad (e) {
    const s = this
    let { onError } = s.props
    onError && onError(e)
    s.setState({ loading: false })
  }

  handleError (e) {
    const s = this
    let { onLoad } = s.props
    onLoad && onLoad(e)
    s.setState({ loading: true })
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
  notFoundMessage: PropTypes.string
}

TheImage.defaultProps = {
  width: 'auto',
  height: 'auto',
  scale: 'fill',
  onLoad: null,
  onError: null,
  notFoundMessage: 'Not Found'
}

TheImage.displayName = 'TheImage'

export default TheImage
