import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import pick from 'lodash/pick';
import JobCounts from './JobCounts';
import RedisStats from './RedisStats';
import query from '../query/queue';

class Queue extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        queueName: PropTypes.string,
        hostId: PropTypes.string,
      }),
    }).isRequired,
    data: PropTypes.instanceOf(Object).isRequired,
  }

  render() {
    const {
      match,
      data: {
        loading,
        queue,
      },
    } = this.props;

    if (loading) {
      return null;
    }

    const jobCountsByState = pick(
      queue.details.jobCounts,
      ['completed', 'waiting', 'failed', 'active', 'delayed'],
    );

    return (
      <div>
        <h1>{queue.hostId} / {queue.name}</h1>
        <RedisStats {...queue.details.redisStats} />
        <JobCounts match={match} jobCountsByState={jobCountsByState} />
      </div>
    );
  }
}

export default graphql(query, {
  options: ({ match: { params } }) => ({
    variables: {
      name: params.queueName,
      hostId: params.hostId,
    },
  }),
})(Queue);
