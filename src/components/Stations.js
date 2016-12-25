import React, { Component } from 'react';

import playlists from '../../data/playlists.json';
import TopThreads from './TopThreads';
import Item from './Item';
import Icon from './Icon';
import Button from './Button';
import { pluralize } from '../utils/utils';
import { APP_NAME, APP_TAGLINE, SEPARATOR } from '../config';

export default class Station extends Component {

  state = {
    limitSubs: 200,
    searchTerm: '',
  };

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

// TODO mouseover show description
  renderMulti({ path, name, description }) {
    return (
      <Item
        key={path}
        href={path}
        title={name}
        thumbnail={null}
      />
    );
  }

  // TODO mouseover show subscribers (or description)
  renderSubreddit({ name, subscribers }) {
    return (
      <Item
        key={name}
        href={'/r/' + name}
        title={name}
        thumbnail={null}
      />
    );
  }

// TODO add activeLinks with line under to toggle showing  what station mode (subred, thread, genre, custom)
// TODO make a saerch component
// TODO Paginate rather than show more
  renderSearch(searchTerm) {
    return (
      <section style={style.search}>
        <input
          type="text"
          value={searchTerm}
          onChange={this.onChangeSearch}
          placeholder="filter"
        />
        {!searchTerm && <div style={style.searchIcon}><Icon icon="search" /></div>}
        {searchTerm &&
          <button style={style.clearSearch} onClick={() => this.setState({ searchTerm: '' })} >
            <Icon icon="clear" />
          </button>
        }
      </section>
    );
  }

  render() {
    const { limitSubs, searchTerm } = this.state;
    const subreddits = playlists.subreddits.filter(this.filterSubreddit);
    // var currentPlaylist = (
    //   <div style={style.title}>
    //     this.renderSubreddit({name: 'FUCK ME'})
    //   </div>
    // )
    //TODO put currentPlaylist above stition list and have it represent selected thread
    return (
      <section className="station-container">
        {this.renderSearch(searchTerm)}
        <ul style={style.list}>
          {subreddits.slice(0, limitSubs).map(this.renderSubreddit)}
          {subreddits.length === 0 &&
            <li>no stations found</li>
          }
        </ul>
        {subreddits.length > limitSubs &&
        <Button onClick={() => this.setState({ limitSubs: limitSubs + 100 })}>
          Show more
        </Button>
        }
      </section>

    );
  }
}

const style = {
  list: {
    fontWeight: '500',
    lineHeight: '1.2',
    paddingLeft: '5px'
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '85%',
    height: '25px',
    margin: 'auto',
    marginLeft: '0px',
    marginBottom: '.5rem',
    padding: '4px',
    // background: 'lighten(#000, 97%)',
    background: 'hsl(0, 0%, 97%)',
    borderRadius: '2em',
  },
  searchIcon: {
    fill: 'hsl(0, 0%, 75%)',
    flexShrink: '0',
  },
  clearSearch: {
    padding: '0',
  },
  title: {
    color: '#000'
  }
};
