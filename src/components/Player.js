import React, { Component, PropTypes } from 'react';
import { dimensions } from '../utils/utils';
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
    video: false,
    volume: 0.8,
    played: 0,
    loaded: 0,
    duration: 0,
    showVidToggle: false
  };
  componentDidMount() {
    this.hideVideo()
    window.addEventListener("resize", this.hideVideo);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.activePost !== nextProps.activePost) {
      this.setState({
        playing: true,
        played: 0,
        loaded: 0,
      });
    }
  }
  hideVideo = ()  => {
    // hide video if window too small
    const max_ratio = 1.3 // TODO define elsewhere?
    let dim = dimensions();
    let ratio = dim.app_width/dim.app_height
    if (ratio > max_ratio) {
      this.setState({
        video: false,
        showVidToggle: false
      });
    } else {
      this.setState({ showVidToggle: true });
    }
  };
  onPlayerPlay = () => {
    this.setState({ playing: true });
  };
  onPlayerPause = () => {
    this.setState({ playing: false }); // TODO: Fix YT firing onPause when ending
  };
  onPlayerProgress = (state) => {
    this.setState(this.state.seeking ? {} : state);
  };
  onPlayerDuration = (duration) => {
    this.setState({ duration });
  };
  onPlayerEnded = () => {
    this.props.onSkip();
  };
  onPlayerError = () => {
    this.props.onSkip();
  };
  onTogglePlaying = () => {
    this.setState({ playing: !this.state.playing });
  };
  onToggleVideo = () => {
    this.setState({ video: !this.state.video });
  };
  onClickNext = () => {
    this.props.onSkip();
  };
  onClickPrev = () => {
    this.props.onSkip(-1);
  };
  onSetVolume = (volume) => {
    this.setState({ volume });
  };
  onSeekStart = () => {
    this.setState({ seeking: true });
  };
  onSeekChange = (fraction) => {
    this.setState({ played: fraction });
  };
  onSeekEnd = (fraction) => {
    this.setState({ seeking: false });
    this.refs.player.seekTo(fraction);
  };
  render() {
    const { activePost } = this.props;
    const { playing, volume, duration, played, loaded } = this.state;
    const style = getStyle(this.state.video)
    let vidIcon
    if (this.state.showVidToggle) {
      vidIcon = (
        <button onClick={this.onToggleVideo}>
          <Icon icon="video" />
        </button>
      )
    }

    return (
      <div>
        <section className={classNames.playerWrapper} style={style.wrapper}>
          <ReactPlayer
            ref="player"
            className={classNames.player}
            width="100%"
            height="100%"
            url={activePost ? activePost.url : null}
            playing={playing}
            volume={volume}
            onPlay={this.onPlayerPlay}
            onPause={this.onPlayerPause}
            onProgress={this.onPlayerProgress}
            onDuration={this.onPlayerDuration}
            onEnded={this.onPlayerEnded}
            onError={this.onPlayerError}
            youtubeConfig={{ preload: true }}
          />
        </section>
        <section className={activePost ? classNames.controls : classNames.disabledControls}>
          <button onClick={this.onClickPrev}>
            <Icon icon="prev" />
          </button>
          <button onClick={this.onTogglePlaying}>
            <Icon icon={playing ? 'pause' : 'play'} />
          </button>
          <button onClick={this.onClickNext}>
            <Icon icon="next" />
          </button>
          {vidIcon}
          <Duration className={classNames.duration} seconds={duration * played} />
          <Range
            className={classNames.timeSlider}
            primary={played}
            secondary={loaded}
            onSeekStart={this.onSeekStart}
            onSeekChange={this.onSeekChange}
            onSeekEnd={this.onSeekEnd}
          />
          <Duration className={classNames.duration} seconds={duration} />
            <div className={classNames.volumeIcon} >
              <Icon icon="volume" />
            </div>
            <Range
              className={classNames.volumeSlider}
              primary={volume}
              onSeekChange={this.onSetVolume}
            />
        </section>
      </div>
    );
  }
}
function getStyle(state) {
  let display;
  state ? display = 'block' : 'none';
  return {
    wrapper: {
      display: display
    }
  }
};
