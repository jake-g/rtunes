import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import 'normalize.css/normalize.css'
import '../styles/defaults.scss'
import classNames from '../styles/containers/App.scss'
import { updateFavicon } from '../utils'
import { APP_NAME, AUTHOR_URL, SOURCE_URL, SEPARATOR } from '../config'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  componentDidMount () {
    const { params, location } = this.props
    // updateFavicon(params, location.pathname)
  }
  componentWillReceiveProps ({ params, location }) {
    // updateFavicon(params, location.pathname)
  }
  render () {
    return (
      <div className={classNames.app}>
        {this.props.children}
      </div>
    )
  }
}
