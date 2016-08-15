import React, { Component } from 'react'

import playlists from '../../data/playlists.json'
import TopThreads from './TopThreads'
import Item from './Item'
import Icon from './Icon'
import Button from './Button'
import { pluralize } from '../utils'
import { APP_NAME, APP_TAGLINE, SEPARATOR } from '../config'

export default class Station extends Component {

  state = {
    limitSubs: 25,
    searchTerm: ''
  };

  onChangeSearch = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  };

  filterSubreddit = ({ name }) => {
    const { searchTerm } = this.state
    if (searchTerm.length > 1) {
      return name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    }
    return true
  };

// meta={pluralize(subscribers, 'subscriber')}
  renderSubreddit ({ name, subscribers }) {
    return (
      <Item
        key={name}
        href={'/r/' + name}
        title={name}
        thumbnail={null}
      />
    )
  }

// TODO make a saerch component
// TODO Paginate rather than show more
  renderSearch (searchTerm) {
    return (
      <section style={style.search}>
        <div style={style.searchIcon}><Icon  icon='search' /></div>
        <input
          type='text'
          value={searchTerm}
          onChange={this.onChangeSearch}
          placeholder='search'
        />
        {searchTerm &&
          <button style={style.clearSearch} onClick={() => this.setState({ searchTerm: '' })} >
            <Icon icon='clear' />
          </button>
        }
      </section>
    )
  }

  render () {
    const { limitSubs, searchTerm } = this.state
    const subreddits = playlists.subreddits.filter(this.filterSubreddit)
    return (
      <section>
      {this.renderSearch(searchTerm)}
        <ul style={style.list}>
          {subreddits
              .slice(0, limitSubs)
              .map(this.renderSubreddit)
          }
          {subreddits.length === 0 &&
            <li>no subreddits found</li>
          }
        </ul>
      {subreddits.length > limitSubs &&
        <Button style={{float: 'left'}} onClick={() => this.setState({ limitSubs: limitSubs + 15 })}>
          Show more
        </Button>
      }
      </section>

    )
  }
}

const style = {
  search: {
  },
  list: {
    maxHeight: '80vh',
    overflowY: 'scroll',
    fontWeight: '400',
    lineHeight: '1',
    fontSize: '11px'
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '90%',
    height: '30px',
    marginBottom: '.5rem',
    padding: '4px',
    // background: 'lighten(#000, 97%)',
    background: 'hsl(0, 0%, 97%)',
    borderRadius: '2em',
  },
  searchIcon: {
    marginLeft: '4px',
    flexShrink: '0',
  },
  clearSearch: {
    padding: '0',
  }
}
