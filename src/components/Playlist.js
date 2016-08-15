import React, { Component, PropTypes } from 'react'
import { fetchPosts } from 'fetch-reddit'
import ReactPlayer from 'react-player'
import { Link } from 'react-router'

import classNames from '../styles/components/Playlist.scss'
import Player from './Player'
import Button from './Button'
import Post from './Post'
import Stations from './Stations'
import { APP_NAME, IGNORE_AUTHORS, DEFAULT_POST_TITLE, SEPARATOR } from '../config'

export default class Playlist extends Component {
  static propTypes = {
    location: PropTypes.object,
    params: PropTypes.object
  };
  state = {
    posts: {},
    loadMore: null,
    activePost: null
  };
  componentDidMount () {
    const { pathname, query } = this.props.location
    fetchPosts(pathname, query).then(::this.processPosts)
  }
  componentWillReceiveProps (nextProps) {
    if (!this.getPosts(nextProps)) {
      const { pathname, query } = nextProps.location
      fetchPosts(pathname, query).then(::this.processPosts)
    }
  }
  processPosts ({ posts, loadMore }) {
    const { pathname, search } = this.props.location
    const currentPosts = this.getPosts()
    posts = posts.filter(::this.filterPost)
    if (currentPosts) {
      posts = currentPosts.concat(posts)
    }
    this.setState({
      posts: Object.assign(this.state.posts, {
        [pathname + search]: posts
      }),
      loadMore: () => {
        loadMore().then(::this.processPosts)
        this.setState({ loadMore: null })
      }
    })
  };
  filterPost (post) {
    return ReactPlayer.canPlay(post.url) && IGNORE_AUTHORS.indexOf(post.author) === -1
  }
  getPosts (props = this.props) {
    const { pathname, search } = props.location
    const { posts } = this.state
    return posts[pathname + search]
  }

  playPost = (post) => {
    document.title = `${post.title || DEFAULT_POST_TITLE}${SEPARATOR}${APP_NAME}`
    this.setState({
      activePost: post
    })

    // Load more posts if this is the last in the current playlist
    const { loadMore } = this.state
    const posts = this.getPosts()
    if (loadMore && post.id === posts[posts.length - 1].id) {
      loadMore()
    }
  };
  skip = (delta = +1) => {
    const posts = this.getPosts()
    const { activePost } = this.state
    const index = posts.findIndex((post) => post.id === activePost.id)
    const post = posts[index + delta] || posts[0]
    this.playPost(post)
  };
  renderPosts (posts) {
    if (!posts) {
      return 'Loading…'
    }
    if (posts.length === 0) {
      return 'No playable media found.'
    }
    return (
      <ul className={classNames.playlist}>
        {posts.map(this.renderPost)}
      </ul>
    )
  }
  renderPost = (post) => {
    const { activePost } = this.state
    return (
      <Post
        key={post.id}
        post={post}
        onPlay={this.playPost}
        playing={activePost ? activePost.id === post.id : false}
        showSubreddit
      />
    )
  };
  renderSortLinks (url = '') {
    const { subreddit, multi, username, post_id } = this.props.params
    if (subreddit && !post_id || multi) {
      const { pathname, search } = this.props.location
      const path = subreddit ? `/r/${subreddit}` : `/user/${username}/m/${multi}`
      return (
        <ul className={classNames.sort}>
          <li><Link to={path} activeClassName={classNames.activeSortLink}>hot</Link></li>
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
            )
          })}
          <li>{SEPARATOR}</li>
          <li><a href={url} target='_blank'>now playing</a></li>
          {/*<li>{SEPARATOR}</li>*/}
          {/*<li><a href={'https://www.reddit.com' + pathname + search} target='_blank'>reddit source</a></li>*/}

        </ul>
      )
    }
    return null
  }
  render () {
    const { loadMore, activePost } = this.state

    //TODO fix hacky way to supply now playing url
    let url
    if (activePost) {
      url = activePost.url
    }
    let style = getStyle()

    var filter = (
      <div className="header" style={style.header}>
        {this.renderSortLinks(url)}
      </div>
    )

    // TODO make headeer alternate stations, threads,
    var stationsLink = (
      <div className="header" style={style.header}>
        <ul className={classNames.sort}>
          <li><Link to={'/'} >stations</Link></li>
        </ul>
      </div>
    )
    const posts = this.getPosts()
    var playlist = (
      <div className="playlist-container">
        {filter}
        <div className="playlist" style={style.playlist}>
          {this.renderPosts(posts)}
          {posts &&
            <Button disabled={!loadMore} onClick={loadMore}>
              Load more
            </Button>
          }
        </div>
      </div>
    )

    var stations = (
      <div className="station-container" style={style.stations}>
        {stationsLink}
        <Stations />
      </div>
    );

    // TODO make buttton to pop out player
    var player = (
      <Player className="player" activePost={activePost} style={style.footer} onSkip={this.skip} />
    )

    return (
      <div style={style.page}>
        <div className="content" style={style.contents}>
          {stations}
          {playlist}
        </div>
        {player}
      </div>
    )
  }
}

// TODO move header and footer (player) into App.js
// TODO either use inline or scss...
function  getStyle() {
  // TODO this looks sketchy...
  document.body.style.overflow = "hidden";

// TODO player needs to alway show noamtter what size
// TODO hide stations if mobile
  return {
    page: {
      display: 'flex',
      flexDirection: 'column',
    },
    contents: {
      flex: 3,
      display: 'flex',
      flexDirection: 'row',
    },
    playlist: {
      flex: 3,
      overflowY: 'scroll',
      height: '90vh'
    },
    footer: {
      flex: '1 0 30px',
      height: '30px'
    },
    stations: {
      flex: '1 0 140px',
      minWidth: '120px',
      maxWidth: '160px',
      overflowY: 'scroll'
    }
  };
}
