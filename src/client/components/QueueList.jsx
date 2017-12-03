import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
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
      <Paper zDepth={1} style={{ height: '100%' }}>
        <AppBar title="Queues" />
        <List>
          {queues.map(queue =>
            <QueueListItem key={queue.id} {...queue} />)}
        </List>
      </Paper>
    );
  }
}

export default graphql(query)(QueueList);
