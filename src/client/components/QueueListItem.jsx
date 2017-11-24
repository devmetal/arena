import React from 'react';
import PropTypes from 'prop-types';
import RedisStats from './RedisStats';

const QueueListItem = ({ name, hostId, details }) => (
  <div className="item">
    <div>{hostId} / <b>{name}</b></div>
    <div>Redis Statistics</div>
    <RedisStats {...details.redisStats} />
  </div>
);

QueueListItem.propTypes = {
  name: PropTypes.string.isRequired,
  hostId: PropTypes.string.isRequired,
  details: PropTypes.instanceOf(Object).isRequired,
};

export default QueueListItem;
