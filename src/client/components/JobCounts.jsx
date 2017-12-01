import React from 'react';
import PropTypes from 'prop-types';
import JobCount from './JobCount';

const JobCounts = ({ match, jobCountsByState }) => (
  <div>
    <JobCount state="completed" count={jobCountsByState.completed} match={match} />
    <JobCount state="waiting" count={jobCountsByState.waiting} match={match} />
    <JobCount state="active" count={jobCountsByState.active} match={match} />
    <JobCount state="failed" count={jobCountsByState.failed} match={match} />
    <JobCount state="delayed" count={jobCountsByState.delayed} match={match} />
  </div>
);

JobCounts.propTypes = {
  jobCountsByState: PropTypes.objectOf(PropTypes.number).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

export default JobCounts;
