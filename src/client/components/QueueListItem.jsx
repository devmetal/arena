import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RedisStats from './RedisStats';

const QueueListItem = ({ name, hostId, details }) => (
  <div className="item">
    <Link to={`/${hostId}/${name}`}>{hostId} / <b>{name}</b></Link>
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
