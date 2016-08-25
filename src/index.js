import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

// import { trackPageView } from './analytics'
import App from './containers/App';
import Home from './containers/Home';
import Playlist from './components/Playlist';

// Hook up analytics
// browserHistory.listen(trackPageView)

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
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
