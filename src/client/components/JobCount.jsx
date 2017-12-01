import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const JobCount = ({ state, count, match }) => (
  <div>
    <Link
      to={`${match.url}/jobs/${state}`}
    >
      <h2>{state}</h2>
    </Link>
    <h3>{count}</h3>
  </div>
);

JobCount.propTypes = {
  state: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

export default JobCount;
