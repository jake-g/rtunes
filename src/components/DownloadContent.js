import React from 'react';
import {APP_NAME, SOURCE_URL} from '../config'
import {Link} from 'react-router';
import Icon from './Icon';
import classNames from '../styles/components/Download.scss';

export default function DownloadContent() {

	return (
		<section style={style.container}>
			<h2>
				Download
			</h2>
			<div className={classNames.platforms}>
				<a style={style.button} href="https://github.com/jake-g/rtunes/releases/download/1.3.7-alpha/rtunes-win32-x64.zip" target='_blank'>
					<Icon style={style.bigIcon} icon="pc"/>
					<h4>PC</h4>
				</a>
				<a style={style.button} href="https://github.com/jake-g/rtunes/releases/download/1.3.7-alpha/rtunes-darwin-x64.zip" target='_blank'>
					<Icon style={style.bigIcon} icon="mac"/>
					<h4>macOS</h4>
				</a>
				<a style={style.button} href="https://github.com/jake-g/rtunes/releases/download/1.3.7-alpha/rtunes-darwin-x64.zip" target='_blank'>
					<Icon style={style.bigIcon} icon="linux"/>
					<h4>linux</h4>
				</a>
			</div>
			<p style={{width: '450px', margin: '20px auto'}}>Other releases can be found <a href="https://github.com/jake-g/rtunes/releases/" target='_blank'>here</a></p>

		</section>
	)
}
const style = {
	container: {
		marginLeft: '10px'
	},
	bigIcon: {
		width: '50%',
		verticalAlign: 'middle'
	}
}
