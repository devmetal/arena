import React from 'react';
import PropTypes from 'prop-types';
import JobCount from './JobCount';

const JobCounts = ({ jobTypes }) => (
  <div>
    {Object.keys(jobTypes).filter(key => key !== '__typename').map(key =>
      <JobCount key={key} type={key} count={jobTypes[key]} />)}
  </div>
);

JobCounts.propTypes = {
  jobTypes: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default JobCounts;
