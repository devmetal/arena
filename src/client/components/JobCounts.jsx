import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import styled from 'styled-components';
import JobCount from './JobCount';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: strech;
`;

const JobCounts = ({ match, jobCountsByState }) => (
  <Flex>
    <JobCount state="completed" count={jobCountsByState.completed} match={match} />
    <JobCount state="waiting" count={jobCountsByState.waiting} match={match} />
    <JobCount state="active" count={jobCountsByState.active} match={match} />
    <JobCount state="failed" count={jobCountsByState.failed} match={match} />
    <JobCount state="delayed" count={jobCountsByState.delayed} match={match} />
  </Flex>
);

JobCounts.propTypes = {
  jobCountsByState: PropTypes.objectOf(PropTypes.number).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

export default JobCounts;
