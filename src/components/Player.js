import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { SC_CLIENT_ID } from '../config'
import {dimensions} from '../utils/utils';
import ReactPlayer from 'react-player';

import classNames from '../styles/components/Player.scss';
import Range from './Range';
import Icon from './Icon';
import Duration from './Duration';

export default class Player extends Component {
	static propTypes = {
		activePost: PropTypes.object,
		onSkip: PropTypes.func
	};
	state = {
		playing: false,
		video: false, // show vid or art
		volume: 0.75,
		played: 0,
		loaded: 0,
		duration: 0,
		showVidToggle: true,
		favorite: false
	};
	componentDidMount() {
		this.hideVideoIcon()

		// window.addEventListener("resize", this.hideVideo);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.activePost !== nextProps.activePost) {
			const nextUrl = nextProps.activePost.url || '';
			this.setState({
				playing: true, played: 0, loaded: 0,
				favorite: this.checkFav(nextUrl)
			});
		}
	}
	hideVideoIcon = () => {
		// hide video if window too small
		const max_ratio = 1.4
		let dim = dimensions();
		let width = Math.min(dim.app_width, dim.width);
		let height = Math.min(dim.app_height, dim.height);
		height = height < 160 ? dim.height : height; // fixes safari
		if (width / height > max_ratio || height < 320 || width < 400 ) {
			this.setState({video: false, showVidToggle: false});
		} else {
			this.setState({showVidToggle: true});
		}
	};
	addFavorite = (url) => {
		// get set or make blank array if not stored,
		let favorites = new Set(JSON.parse(localStorage.getItem('favorites'))) || [];
		favorites.add(url);
		console.log('favorite', url);
		console.log('current facorites', favorites);
		localStorage.setItem('favorites', JSON.stringify(favorites));
	};
	removeFavorite = (url) => {
		let favorites = new Set(JSON.parse(localStorage.getItem('favorites'))) || [];
		favorites.delete(url);
		console.log('remove favorite', url);
		console.log('current facorites', favorites);
		localStorage.setItem('favorites', JSON.stringify(favorites));
	};
	// TODO make component
	getFav = () => {
		return new Set(JSON.parse(localStorage.getItem('favorites'))) || new Set();
	}
	addFav = (url) => {
		const favorites = this.getFav();
		favorites.add(url);
		console.log('favorite', url);
		console.log('current facorites', favorites);
		return localStorage.setItem('favorites', JSON.stringify(favorites));
	}
	removeFav = (url) => {
		const favorites = this.getFav();
		favorites.delete(url);
		console.log('remove favorite', url);
		console.log('current facorites', favorites);
		return localStorage.setItem('favorites', JSON.stringify(favorites));
	}
	checkFav = (url) => {
		const favorites = this.getFav();
		console.log('contains favorite', url, favorites.has(url));
		return favorites.has(url);
	}
	onPlayerPlay = () => {
		this.setState({playing: true});
	};
	onPlayerPause = () => {
		this.setState({playing: false}); // TODO: Fix YT firing onPause when ending
	};
	onPlayerProgress = (state) => {
		this.setState(this.state.seeking
			? {}
			: state);
	};
	onPlayerDuration = (duration) => {
		this.setState({duration});
	};
	onPlayerEnded = () => {
		this.props.onSkip();
	};
	onPlayerError = () => {
		this.props.onSkip();
	};
	onTogglePlaying = () => {
		this.setState({
			playing: !this.state.playing
		});
	};
	onClickNext = () => {
		this.props.onSkip();
	};
	onToggleFavorite = () => {
		const {activePost} = this.props;
		const {favorite} = this.state;
		let url = activePost.url;
		favorite ? this.removeFavorite(url) : this.addFavorite(url);
		this.setState({
			favorite: !favorite
		});
	};
	onToggleVideo = () => {
		this.setState({
			video: !this.state.video
		});
	};
	onClickNext = () => {
		this.props.onSkip();
	};
	onClickPrev = () => {
		this.props.onSkip(-1);
	};
	onSetVolume = (volume) => {
		this.setState({volume});
	};
	onSeekStart = () => {
		this.setState({seeking: true});
	};
	onSeekChange = (fraction) => {
		this.setState({played: fraction});
	};
	onSeekEnd = (fraction) => {
		this.setState({seeking: false});
		this.refs.player.seekTo(fraction);
	};
	render() {
		const {activePost} = this.props;
		const {playing, volume, duration, played, loaded} = this.state;
		const style = getStyle(this.state.video)
		let vidIcon
		if (this.state.showVidToggle) {
			let iconVid = this.state.video
				? "fullscreen-exit"
				: "fullscreen"
			vidIcon = (
				<button onClick={this.onToggleVideo}>
					<Icon icon={iconVid}/>
				</button>
			)
		}
		let iconFav = this.state.favorite
			? "favorite"
			: "favorite-outline"
		let favIcon = (
			<button onClick={this.onToggleFavorite}>
				<Icon icon={iconFav}/>
			</button>
		)

		return (
			<div>
				<section className={classNames.playerWrapper} style={style.wrapper}>
					<ReactPlayer ref="player"
						className={classNames.player}
						width="100%" height="100%"
						url={activePost ? activePost.url : null}
						playing={playing} volume={volume}
						onPlay={this.onPlayerPlay}
						onPause={this.onPlayerPause}
						onProgress={this.onPlayerProgress}
						onDuration={this.onPlayerDuration}
						onEnded={this.onPlayerEnded}
						onError={this.onPlayerError}
						youtubeConfig={{preload: true}}
						soundcloudConfig={{clientId: SC_CLIENT_ID, showArtwork: true}}
						/>
				</section>
				<section className={activePost
					? classNames.controls
					: classNames.disabledControls}>
					<button onClick={this.onClickPrev}>
						<Icon icon="prev"/>
					</button>
					<button onClick={this.onTogglePlaying}>
						<Icon icon={playing
							? 'pause'
							: 'play'}/>
					</button>
					<button onClick={this.onClickNext}>
						<Icon icon="next"/>
					</button>
					{vidIcon}
					<Duration className={classNames.duration} seconds={duration * played}/>
					<Range className={classNames.timeSlider} primary={played} secondary={loaded} onSeekStart={this.onSeekStart} onSeekChange={this.onSeekChange} onSeekEnd={this.onSeekEnd}/>
					<Duration className={classNames.duration} seconds={duration}/>
					{favIcon}
					<div className={classNames.volumeIcon}>
						<Icon icon="volume"/>
					</div>
					<Range className={classNames.volumeSlider} primary={volume} onSeekChange={this.onSetVolume}/>
				</section>
			</div>
		);
	}
}
function getStyle(state) {
	let display;
	state
		? display = 'block'
		: 'none';
	return {
		wrapper: {
			display: display
		}
	}
};
