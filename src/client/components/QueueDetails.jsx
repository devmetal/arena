import React from 'react';
import PropTypes from 'prop-types';

import JobCounts from './JobCounts';
import RedisStats from './RedisStats';

const QueueDetails = ({ redisStats, jobCounts }) => (
  <div>
    <JobCounts jobCounts={jobCounts} />
    <RedisStats redisStats={redisStats} />
  </div>
);

QueueDetails.propTypes = {
  redisStats: PropTypes.instanceOf(Object).isRequired,
  jobCounts: PropTypes.instanceOf(Object).isRequired,
};

export default QueueDetails;
