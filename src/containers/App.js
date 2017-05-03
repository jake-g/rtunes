import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import 'normalize.css/normalize.css';
import '../styles/defaults.scss';
import classNames from '../styles/containers/App.scss';
import { updateFavicon, supportedBrowser } from '../utils/utils';
import { APP_NAME, AUTHOR_URL, SOURCE_URL, SEPARATOR } from '../config';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  componentDidMount() {
    const { params, location } = this.props;
    if (!supportedBrowser()) {
      alert('Warning: Works best with Chrome');
    }
  }

  render() {
    return (
      <div className={classNames.app}>
        {this.props.children}
      </div>
    );
  }
}
