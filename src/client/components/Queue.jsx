import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
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
        <AppBar title={`${queue.hostId}/${queue.name}`} showMenuIconButton={false} />
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
