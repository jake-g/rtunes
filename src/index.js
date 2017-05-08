import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, browserHistory, hashHistory } from 'react-router';
import { trackPageView } from './utils/analytics'

import App from './containers/App';
import Home from './containers/Home';
import Download from './containers/Download';
import About from './containers/About';
import Playlist from './components/Playlist';
import { whatBrowser, detectMobile } from './utils/utils';


// Store constants
const browser = whatBrowser(); // False if unsupported
const mobile = detectMobile();
console.log('root', browser, typeof browser, mobile, typeof mobile);
localStorage.setItem('browser', browser);
localStorage.setItem('mobile', mobile);

// Hook up analytics
browserHistory.listen(trackPageView)

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/download" component={Download}/>
      <Route path="/about" component={About}/>

      <Route path="r/:subreddit" component={Playlist}>
        <Route path="comments/:post_id/:post_slug(/:comment_id)" />
        <Route path=":sort" />
      </Route>
      <Route path="user/:username" component={Playlist}>
        <Route path="m/:multi(/:sort)" />
        <Route path=":filter" />
      </Route>
    </Route>
    <Redirect from="/u/:username(/**)" to="/user/:username(/**)" />
  </Router>
), document.getElementById('app'));
