import React, { Component } from 'react';

import classNames from '../styles/containers/Home.scss';
import header from '../styles/components/Playlist.scss';
import playlists from '../../data/playlists.json';
import TopThreads from '../components/TopThreads';
import Item from '../components/Item';
import Icon from '../components/Icon';
import Button from '../components/Button';
import About from './About'
import { pluralize } from '../utils/utils';
import { APP_NAME, APP_TAGLINE, SEPARATOR } from '../config';

export default class Home extends Component {

  state = {
    limitSubs: 15,
    limitGenres: 10,
    searchTerm: '',
    showStations: false
  };

  componentDidMount() {
    document.title = `${APP_NAME}${SEPARATOR}${APP_TAGLINE}`;
  }

  onChangeSearch = (e) => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  filterSubreddit = ({ name }) => {
    const { searchTerm } = this.state;
    if (searchTerm.length > 1) {
      return name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    }
    return true;
  };

  renderMulti({ path, name, description }) {
    return (
      <Item
        key={path}
        href={path}
        title={name}
        meta={description}
        thumbnail={null}
      />
    );
  }

  renderSubreddit({ name, subscribers }) {
    return (
      <Item
        key={name}
        href={'/r/' + name}
        title={name}
        meta={pluralize(subscribers, 'subscriber')}
        thumbnail={null}
      />
    );
  }

  renderSearch(searchTerm) {
    return (
      <section className={classNames.search}>
        <Icon icon="search" className={classNames.searchIcon} />
        <input
          type="text"
          value={searchTerm}
          onChange={this.onChangeSearch}
          placeholder="search"
        />
        {searchTerm &&
          <button onClick={() => this.setState({ searchTerm: '' })} className={classNames.clearSearch}>
            <Icon icon="clear" />
          </button>
        }
      </section>
    );
  }
  
  toggleAbout() {
    this.setState({ showAbout: !this.state.showAbout });
  }
  render() {
    const { limitSubs, limitGenres, searchTerm } = this.state;
    const subreddits = playlists.subreddits.filter(this.filterSubreddit);
    // TODO this looks sketchy...
    document.body.style.overflow = 'auto';
    
    let about;
    if (this.state.showAbout) {
      about = (
          <About onClose={this.toggleAbout}/>
      );
    }
    return (
      <section className={classNames.home}>
        <div className="header" style={style.header}>
          <ul className={header.sort}>
            <li> <Icon icon="logo" /></li>
            <li> rtunes </li>
            <li>{SEPARATOR}</li>
            <li className={header.activeSortLink}>
               <button onClick={() => this.toggleAbout()} >about</button> 
            </li>
          </ul>
          {about}
        </div>
        <h2>
          <Icon icon="playlist" />
          Playlists
        </h2>
        {this.renderSearch(searchTerm)}
        <ul className={classNames.subreddits}>
          {subreddits
              .slice(0, limitSubs)
              .map(this.renderSubreddit)
          }
          {subreddits.length === 0 &&
            <li>no subreddits found</li>
          }
        </ul>
        {subreddits.length > limitSubs &&
          <Button onClick={() => this.setState({ limitSubs: limitSubs + 15 })}>
            Show more
          </Button>
        }

        <h2>
          <Icon icon="genres" />
          Genres
        </h2>
        <ul className={classNames.genres}>
          {playlists.genres.slice(0, limitGenres).map(this.renderMulti)}
        </ul>
        {playlists.genres.length > limitGenres &&
          <Button onClick={() => this.setState({ limitGenres: playlists.genres.length })}>
            Show all
          </Button>
        }

        <h2>
          <Icon icon="discover" />
          Discover
        </h2>
        {playlists.discover.map(this.renderMulti)}

        <h2>
          <Icon icon="threads" />
          Threads
        </h2>
        <TopThreads />
      </section>
    );
  }
}
const style = {
  header: {
    flex: '0 0 32px',
    width: '100%',
    overflowX: 'hidden'
  },
};
