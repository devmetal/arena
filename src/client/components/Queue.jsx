import React from 'react';

export default ({ match }) => (
  <h1>Queue: {match.params.hostId} / {match.params.queueName}</h1>
);
