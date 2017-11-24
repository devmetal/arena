import React from 'react';
import Dashboard from './components/Dashboard';
import QueueList from './components/QueueList';
import Queue from './components/Queue'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

export default () => (
  <Router>
    <div>
      <QueueList />
      <Route exact path="/" component={Dashboard} />
      <Route path="/:hostId/:queueName" component={Queue} />
    </div>
  </Router>
);
