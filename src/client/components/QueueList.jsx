import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import query from '../query/queues';
import QueueListItem from './QueueListItem';

class QueueList extends Component {
  static propTypes = {
    data: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    data: [],
  };

  render() {
    const {
      data: {
        loading,
        queues,
      },
    } = this.props;

    if (loading) {
      return null;
    }

    return (
      <div className="queueList">
        {queues.map(queue =>
          <QueueListItem key={queue.id} {...queue} />)}
      </div>
    );
  }
}

export default graphql(query)(QueueList);
