import React from 'react';
import PropTypes from 'prop-types';

const RedisStats = ({
  redisVersion,
  totalSystemMemory,
  usedMemory,
}) => (
  <div>
    <div>Ver.: {redisVersion}</div>
    <div>Total Mem.: {totalSystemMemory}</div>
    <div>Used Mem.: {usedMemory}</div>
  </div>
);

RedisStats.propTypes = {
  redisVersion: PropTypes.string.isRequired,
  totalSystemMemory: PropTypes.string.isRequired,
  usedMemory: PropTypes.string.isRequired,
};

export default RedisStats;
