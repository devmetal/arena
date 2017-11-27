import React from 'react';
import PropTypes from 'prop-types';

const JobCount = ({ type, count }) => (
  <div>
    <h2>{type}</h2>
    <h3>{count}</h3>
  </div>
);

JobCount.propTypes = {
  type: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default JobCount;
