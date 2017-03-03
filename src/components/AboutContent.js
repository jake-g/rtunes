import React, { PropTypes } from 'react';

import { APP_NAME, SOURCE_URL } from '../config'
import {Link} from 'react-router';
import Icon from './Icon';

const REACT_URL = 'https://github.com/facebook/react'
const FETCH_REDDIT_URL = 'https://github.com/CookPete/fetch-reddit'
const REACT_PLAYER_URL = 'https://github.com/CookPete/react-player'
const CURATION_URL = 'https://www.reddit.com/r/listentothis/comments/1iwc8n/meta_announcing_the_official_rlistentothis_music/'
const LISTENTOTHIS_URL = 'https://www.reddit.com/r/listentothis'
const CREATOR_URL = 'https://github.com/CookPete'
const RPLAYR_URL = 'https://github.com/CookPete/rplayr'

export default function AboutContent() {
  return (
    <section style={style.container}>
      <h2>
        About
      </h2>
      <dl style={{marginLeft: '20px'}}>
        <dt>What is this?</dt>
        <dd>
           {APP_NAME} creates playlists from content posted on reddit. These playlists are crowdsourced rather than created from an algorithm like Spotify or Pandora.
        </dd>
        <dt>What can I use it on?</dt>
          <dd>
            <ul>
              <li><b>browser :</b> chrome and safari browsers (mobile too) though others may also work</li>
              <li><b>desktop :</b> windows, macOS and linux can be{' '}<Link to={'/get'}>downloaded</Link></li>
              <li><b>mobile app :</b> Android and iOS apps ar in the works</li>
            </ul>
          </dd>
        <dt>What types of stations are there?</dt>
        <dd>
          <ul>
            <li><b>playlists :</b> tunes collected from 100's of curated subreddits, which can be thought of as more specific collections than genres</li>
            <li><b>genres :</b> collections of similar playlists combined to deliver a broader collection of tunes that fit a genre</li>
            <li><b>discover :</b> tunes pulled from all music related subreddits based off activity and moderation level</li>
            <li><b>threads :</b> tunes pulled from comments that respond to a osted question or concept</li>
          </ul>
        </dd>
        <dt>How can I sort the tunes?</dt>
        <dd>
          <ul>
            <li><b>hot :</b> based off activity, and age (default).</li>
            <li><b>new :</b> based purely from time posted. newest on top</li>
            <li><b>top :</b> based off upvotes in a selected time window</li>
          </ul>
        </dd>
        <dt>How does it work?</dt>
        <dd>
          {APP_NAME} is heavily based of <a href={CREATOR_URL} target='_blank'>cookpete's</a> work: <a href={RPLAYR_URL} target='_blank'>rplayer.com</a>. {APP_NAME} is written using <a href={REACT_URL} target='_blank'>React</a>. I modified rplayr to be more compatible with my listenting habits and have more features (more to come too!). it fetches content from Reddit using <a href={FETCH_REDDIT_URL} target='_blank'>fetch-reddit</a>, then <a href={REACT_PLAYER_URL} target='_blank'>react-player</a> plays any supported URLs. Thanks again to <a href={CREATOR_URL} target='_blank'>CookPete</a> for creating these awesome open-source tools. See the <a href={SOURCE_URL} target='_blank'>source code</a> on GitHub. Genres are curated by <a href={CURATION_URL} target='_blank'>u/evilnight</a> over at <a href={LISTENTOTHIS_URL} target='_blank'>r/listentothis</a>.
        </dd>
      </dl>
    </section>
  )
}

const style = {
	container: {
    margin: 'auto 10px'
	}
}
