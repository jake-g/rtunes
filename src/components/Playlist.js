import React, { Component, PropTypes } from 'react';
import { fetchPosts } from '../utils/fetch-tracks';
import ReactPlayer from 'react-player';
import { Link } from 'react-router';

import classNames from '../styles/components/Playlist.scss';
import Player from './Player';
import Icon from './Icon';
import Button from './Button';
import Post from './Post';
import Stations from './Stations';
import { APP_NAME, IGNORE_AUTHORS, DEFAULT_POST_TITLE, SEPARATOR } from '../config';

export default class Playlist extends Component {
  static propTypes = {
    location: PropTypes.object,
    params: PropTypes.object
  };
  state = {
    posts: {},
    loadMore: null,
    activePost: null,
    showStations: true
  };
  componentDidMount() {
    const { pathname, query } = this.props.location;
    fetchPosts(pathname, query).then(::this.processPosts);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.getPosts(nextProps)) {
      const { pathname, query } = nextProps.location;
      fetchPosts(pathname, query).then(::this.processPosts);
    }
  }
  processPosts({ posts, loadMore }) {
    const { pathname, search } = this.props.location;
    const currentPosts = this.getPosts();
    posts = posts.filter(::this.filterPost);
    if (currentPosts) {
      posts = currentPosts.concat(posts);
    }
    this.setState({
      posts: Object.assign(this.state.posts, {
        [pathname + search]: posts
      }),
      loadMore: () => {
        loadMore().then(::this.processPosts);
        this.setState({ loadMore: null });
      }
    });
  }
  filterPost(post) {
    return ReactPlayer.canPlay(post.url) && IGNORE_AUTHORS.indexOf(post.author) === -1;
  }
  getPosts(props = this.props) {
    const { pathname, search } = props.location;
    const { posts } = this.state;
    return posts[pathname + search];
  }

  playPost = (post) => {
    document.title = `${post.title || DEFAULT_POST_TITLE}${SEPARATOR}${APP_NAME}`;
    this.setState({
      activePost: post
    });

    // Load more posts if this is the last in the current playlist
    const { loadMore } = this.state;
    const posts = this.getPosts();
    if (loadMore && post.id === posts[posts.length - 1].id) {
      loadMore();
    }
  };
  skip = (delta = +1) => {
    const posts = this.getPosts();
    const { activePost } = this.state;
    const index = posts.findIndex((post) => post.id === activePost.id);
    const post = posts[index + delta] || posts[0];
    this.playPost(post);
  };
  renderPosts(posts) {
    if (!posts) {
      return (
        <center><b>Loading…</b></center>
      );
    }
    if (posts.length === 0) {
      return 'No playable media found.';
    }
    return (
      <ul className={classNames.playlist}>
        {posts.map(this.renderPost)}
      </ul>
    );
  }
  renderPost = (post) => {
    const { activePost } = this.state;
    return (
      <Post
        key={post.id}
        post={post}
        onPlay={this.playPost}
        playing={activePost ? activePost.id === post.id : false}
        showSubreddit
      />
    );
  };

  toggleStations() {
    this.setState({ showStations: !this.state.showStations });
  }
  renderSortLinks() {
    const { subreddit, multi, username, post_id } = this.props.params;
    if (subreddit && !post_id || multi) {
      const { pathname, search } = this.props.location;
      const path = subreddit ? `/r/${subreddit}` : `/user/${username}/m/${multi}`;
      return (
        <ul className={classNames.sort}>
          <li> <Icon icon="logo" /></li>
          <li> <button onClick={() => this.toggleStations()} ><Icon icon="menu" /></button> </li>
          <li>{SEPARATOR}</li>
          <li><Link to={'/'} >home</Link></li>
          <li>{SEPARATOR}</li>
          <li><Link to={path + '/hot'} activeClassName={classNames.activeSortLink}>hot</Link></li>
          <li><Link to={path + '/new'} activeClassName={classNames.activeSortLink}>new</Link></li>
          <li>{SEPARATOR}</li>
          <li>top</li>
          {['all', 'year', 'month', 'week', 'day'].map((sort) => {
            return (
              <li key={sort}>
                <Link to={{ pathname: `${path}/top`, query: { sort: 'top', t: sort } }} activeClassName={classNames.activeSortLink}>
                  {sort}
                </Link>
              </li>
            );
          })}
          {/* <li><a href={this.state.activePost.url} target='_blank'>now playing</a></li>*/}
          {/* <li>{SEPARATOR}</li>*/}
          {/* <li><a href={'https://www.reddit.com' + pathname + search} target='_blank'>reddit source</a></li>*/}

        </ul>
      );
    } else {   // for TopThreads
      return (
        <ul className={classNames.sort}>
          <li> <Icon icon="logo" /></li>
          <li> <button onClick={() => this.toggleStations()} ><Icon icon="menu" /></button> </li>
          <li>{SEPARATOR}</li>
          <li><Link to={'/'} >home</Link></li>
        </ul>
      )
    }
    return null;
  }
  render() {
    const { loadMore, activePost } = this.state;
    let style = getStyle();

    var header = (
      <div className="header" style={style.header}>
        {this.renderSortLinks()}
      </div>
    );

    const posts = this.getPosts();
    var playlist = (
      <div className="playlist" style={style.playlist}>
          {this.renderPosts(posts)}
          {posts &&
            <Button disabled={!loadMore} onClick={loadMore}>
              Load more
            </Button>
          }
      </div>
    );

    let stations;
    if (this.state.showStations) {
      stations = (
        <div className="station-container" style={style.stations}>
          <Stations />
        </div>
      );
    }

    let info;
    if (activePost) {
      info = (
        <ul className={classNames.title} >
          <li><a href={activePost.url} target='_blank'>{activePost.title}</a></li>
        </ul>
      );
    }

    var player = (
      <div className="player" style={style.footer}>
        {info}
        <Player activePost={activePost} onSkip={this.skip} />
      </div>
    );

    return (
      <div style={style.page}>
        {header}
        <div className="content" style={style.contents}>
          {stations}
          {playlist}
        </div>
        {player}
      </div>
    );
  }
}

function getStyle() {
  document.body.style.overflow = 'hidden';

// TODO hide artwork when small
// TODO hide stations if mobile / small
  return {
    page: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    contents: {
      flex: 'auto',
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
      padding: '2px'
    },
    playlist: {
      overflowY: 'scroll',
      flex: '2 1 500px',
      paddingLeft: '5px'
      // height: '90vh'
    },
    header: {
      flex: '0 0 32px',
      width: '100%',
      overflowX: 'hidden'
    },
    footer: {
      flex: 'auto',
    },
    stations: {
      flex: '1 2 140px',
      minWidth: '120px',
      maxWidth: '160px',
      overflowY: 'scroll'
    },

  };
}
