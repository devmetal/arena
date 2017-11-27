import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
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
    const { data, match: { params } } = this.props;

    if (data.loading) {
      return null;
    }

    return (
      <div>
        <h1>{params.hostId} / {params.queueName}</h1>
        <JobCounts jobTypes={data.queue.details.jobCounts} />
        <RedisStats {...data.queue.details.redisStats} />
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
