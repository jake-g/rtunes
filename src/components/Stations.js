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
// Paginate rather than show more
  renderSearch (searchTerm) {
    let searchBar = (
      <input
        type='text'
        value={searchTerm}
        onChange={this.onChangeSearch}
        placeholder='search'
        style={style.search}
      />
    )
    let button = (
      <button  style={style.icon} onClick={() => this.setState({ searchTerm: '' })} >
        <Icon icon='search' />
      </button>
    )
    if (searchTerm.length > 0) {
      button = (
        searchTerm &&
          <button  style={style.icon} onClick={() => this.setState({ searchTerm: '' })} >
            <Icon icon='clear' />
          </button>
      )
    }
    return (
      <section>
        {searchBar}
        {button}
      </section>
    )
  }

  render () {
    const { limitSubs, searchTerm } = this.state
    const subreddits = playlists.subreddits.filter(this.filterSubreddit)
    return (
      <section style={style.list}>
      {this.renderSearch(searchTerm)}
        <ul>
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
      </section>

    )
  }
}

const style = {
  search: {
    width: '75%'
  },
  list: {
    overflowY: 'scroll',
    height: '85vh'
  }
}
