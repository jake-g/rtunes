import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from '../styles/components/Header.scss';
import {Link} from 'react-router';
import {SEPARATOR} from '../config';
import About from './AboutContent'
import Download from './DownloadContent'
import Icon from './Icon';
import {toggleDarkMode, supportedBrowser, detectMobile} from '../utils/utils';

export default class Header extends Component {
	static propTypes = {
		home: PropTypes.bool,
		download: PropTypes.bool,
		about: PropTypes.bool,
		filters: PropTypes.element,
		toggleStations: PropTypes.func
	};

	state = {
		darkMode: true,
		showStations: true,
		showAbout: false,
		showDownload: false,
		showDlButton: true,
		mobile: false,
		browser: ''
	};

	componentDidMount() {
		this.setState({supportedBrowser: supportedBrowser()});
		this.setState({mobile: detectMobile()});
		this.hideDownloads();
	};

	hideDownloads() { // no need to dl on electron or mobile
		const {browser, mobile} = this.state;
		if (browser === 'electron' || mobile) {
			this.setState({showDlButton: false});
		}
	}

	toggleDark() {
		this.setState({
			darkMode: !this.state.darkMode
		});
		toggleDarkMode(this.state.darkMode)
	}

	toggleAbout() {
		this.setState({
			showAbout: !this.state.showAbout
		});
	}

	toggleDownload() {
		this.setState({
			showDownload: !this.state.showDownload
		});
	}

	toggleStations = () => {
		this.setState({
			showStations: !this.state.showStations
		});
	};

	renderPost = () => {
		const {activePost} = this.state;
		return (<Post
				key={post.id} post={post}
				onPlay={this.playPost}
				playing={activePost ? activePost.id === post.id : false}
		/>);
	};

	render() {
		const {supportedBrowser, showAbout, showDownload, showDlButton} = this.state;
		const {download, about} = this.props;
		const aboutButton = (
			<button style={style.compact} onClick={() => this.toggleAbout()}>
				<a><Icon icon='about'/></a>
			</button>
		)
		let downloadButton;
		if (showDlButton) {
			downloadButton = (
				<button style={style.compact} onClick={() => this.toggleDownload()}>
					<a><Icon icon='download'/></a>
				</button>
			)
		}
		const githubButton = (
			<a href="https://github.com/jake-g/rtunes" target='_blank'><Icon icon="github"/></a>
		)
		let homeButton = (
			<Link to={'/'}><Icon icon="home"/></Link>
		)
		if (download !== true && about !== true) {
			homeButton = (<Icon icon="logo"/>)
		}

		let dark_toggle // only support dark for some browsers
		if (supportedBrowser) {
			dark_toggle = (
				<button style={style.compact} onClick={() => this.toggleDark()}><Icon style={style.small_ico} icon="brightness-1"/></button>
			)
		}

		let aboutContent;
		if (showAbout) {
			aboutContent = (
				<div>
					<About/>
					<button onClick={() => this.toggleAbout()}>
						<Icon icon='expand-less'/>
						<a>close</a>
					</button>
				</div>
			);
		}

		let downloadContent;
		if (showDownload) {
			downloadContent = (
				<div>
					<Download/>
					<button onClick={() => this.toggleDownload()}>
						<Icon icon='expand-less'/>
						<a>close</a>
					</button>
					{SEPARATOR}
				</div>
			);
		}

		let rightSide = (
			<div>
				{downloadButton}
				{aboutButton}
			</div>
		)
		if (download === true) {
			rightSide = (
				<div>
					{aboutButton}
					{SEPARATOR}
					{githubButton}
				</div>
			)
		}
		if (about === true) {
			rightSide = (
				<div>
					{downloadButton}
					{SEPARATOR}
					{githubButton}
				</div>
			)
		}

		var playlist = (
			<ul className={classNames.sort}>
				<li style={{
					marginRight: '0px'
				}}>
					<Link to={'/'}><Icon icon="home"/></Link>
				</li>
				<li>
					<button style={style.compact} onClick={() => this.props.toggleStations()}><Icon icon="menu"/></button>
				</li>
				<li>{dark_toggle}</li>
				<li>{this.props.filters}</li>
				<li style={{
					float: 'right'
				}}>{rightSide}</li>
			</ul>
		)

		var home = (
			<ul className={classNames.sort}>
				<li>{homeButton}</li>
				<li style={style.title}>
					rtunes
				</li>
				{/*<li>{dark_toggle}</li>  STATE DOESNT STICK*/}
				<li style={{
					float: ' right'
				}}>{rightSide}</li>
			</ul>
		)

		let type = playlist
		if (this.props.home === true) {
			type = home
		}
		return (
			<div>
				<div className="header" style={style.header}>
					{type}
				</div>
				{aboutContent}
				{downloadContent}
			</div>
		)
	}
}

const style = {
	header: {
		flex: '0 1 32px',
		height: '32px',
		width: '100%',
		overflowX: 'scroll',
		overflowY: 'hidden',
		whiteSpace: 'nowrap'
	},
	compact: {
		marginRight: '0px',
		paddingLeft: '0px',
		paddingRight: '0px'
	},
	small_ico: {
		width: '1em',
		height: '1em',
		// margin: 'auto 5px',
		verticalAlign: 'middle'
	},
	title: {
		fontSize: '20px',
		verticalAlign: 'middle',
		marginRight: '20px'
	}
}
