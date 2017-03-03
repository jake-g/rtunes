import React, {Component} from 'react';

import classNames from '../styles/containers/Home.scss';
import Header from '../components/Header';
import Button from '../components/Button';
import Download from '../components/DownloadContent'
import {APP_NAME, APP_TAGLINE, SEPARATOR} from '../config';

export default class Home extends Component {

	componentDidMount() {
		document.title = `${APP_NAME}${SEPARATOR}download`;
	}

	render() {
		const header = (
			<div>
				<Header home={true} download={true}/>
			</div>
		);

		return (
			<section className={classNames.home}>
				{header}
				<Download/>
			</section>
		);
	}
}
