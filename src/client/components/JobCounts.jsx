import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import JobCount from './JobCount';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: strech;
`;

const JobCounts = ({ jobCounts }) => (
  <Flex>
    <JobCount state="completed" count={jobCounts.completed} />
    <JobCount state="waiting" count={jobCounts.waiting} />
    <JobCount state="active" count={jobCounts.active} />
    <JobCount state="failed" count={jobCounts.failed} />
    <JobCount state="delayed" count={jobCounts.delayed} />
  </Flex>
);

JobCounts.propTypes = {
  jobCounts: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default JobCounts;
