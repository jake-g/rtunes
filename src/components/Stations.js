import React, { Component } from 'react';

import playlists from '../../data/playlists.json';
import classNames from '../styles/components/Stations.scss';
import TopThreads from './TopThreads';
import Item from './Item';
import Icon from './Icon';
import Button from './Button';
import { pluralize } from '../utils/utils';
import { APP_NAME, APP_TAGLINE, SEPARATOR } from '../config';

export default class Station extends Component {

  state = {
    limitSubs: 30,
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

// TODO add in multi stations
//   renderMulti({ path, name, description }) {
//     return (
//       <Item
//         key={path}
//         href={path}
//         title={name}
//         thumbnail={null}
//       />
//     );
//   }

  renderSubreddit({ name, subscribers }) {
    return (
      <Item
        key={name}
        href={'/r/' + name}
        title={name}
        hoverText={name + ': ' + subscribers + ' subscribers'}
        activeClass = {classNames.active}
        thumbnail={null}
      />
    );
  }

// TODO Paginate rather than show more
  renderSearch(searchTerm) {
    return (
      <section className={classNames.search}>
        <input
          type="text"
          value={searchTerm}
          onChange={this.onChangeSearch}
          placeholder="filter"
        />
        {!searchTerm &&
          <div className={classNames.searchIcon}><Icon icon="search" /></div>}
        {searchTerm &&
          <button className={classNames.clearSearch} onClick={() => this.setState({ searchTerm: '' })} >
            <Icon icon="clear" />
          </button>
        }
      </section>
    );
  }

  render() {
    const { limitSubs, searchTerm } = this.state;
    const subreddits = playlists.subreddits.filter(this.filterSubreddit);
    return (
      <section className="station-container">
        {this.renderSearch(searchTerm)}
        <ul className={classNames.list}>
          {subreddits.slice(0, limitSubs).map(this.renderSubreddit)}
          {subreddits.length === 0 &&
            <li>no stations found</li>
          }
        </ul>
        {subreddits.length > limitSubs &&
        <Button onClick={() => this.setState({ limitSubs: limitSubs*2 })}>
          Show more
        </Button>
        }
      </section>

    );
  }
}
