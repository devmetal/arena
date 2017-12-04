import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { graphql } from 'react-apollo';
import QueueDetails from './QueueDetails';
import query from '../query/queue';

class QueuePage extends Component {
  static propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
  }

  render() {
    const {
      data: {
        loading,
        queue,
      },
    } = this.props;

    if (loading) {
      return null;
    }

    const title = `${queue.hostId}/${queue.name}`;

    return (
      <div>
        <AppBar title={title} showMenuIconButton={false} />
        <QueueDetails
          redisStats={queue.details.redisStats}
          jobCounts={queue.details.jobCounts}
        />
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
})(QueuePage);
