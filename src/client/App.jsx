import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import QueueList from './components/QueueList';
import Queue from './components/Queue';
import Jobs from './components/Jobs';

export default () => (
  <Router>
    <div>
      <QueueList />
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/:hostId/:queueName" component={Queue} />
      <Route exact path="/:hostId/:queueName/jobs/:type" component={Jobs} />
    </div>
  </Router>
);
