import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';
import Highlight from 'react-syntax-highlight';
import Timestamp from './Timetsamp';

const style = {
  margin: '0.5rem',
};

const DataTitle = styled.div`
  font-size: 130%;
  margin-bottom: 1rem;
`;

const stringify = json => JSON.stringify(json, undefined, 2);

const Job = ({ job }) => (
  <Card style={style}>
    <CardHeader
      title={`#${job.id}`}
      actAsExpander
      showExpandableButton
      subtitle={
        <Timestamp secounds={+job.timestamp} />
      }
    />
    <CardActions>
      <FlatButton primary label="Restart" />
      <FlatButton secondary label="Remove" />
    </CardActions>
    <CardText expandable>
      <Paper zDepth={1} style={{ padding: '1rem' }}>
        <DataTitle>Data</DataTitle>
        <Highlight
          lang="json"
          value={stringify(job.data)}
        />
      </Paper>
      <Paper zDepth={1} style={{ padding: '1rem' }}>
        <DataTitle>Return Value</DataTitle>
        <Highlight
          lang="json"
          value={stringify(job.returnvalue)}
        />
      </Paper>
      <Paper zDepth={1} style={{ padding: '1rem' }}>
        <DataTitle>Stacktrace</DataTitle>
        <Highlight
          lang="json"
          value={stringify(job.stacktrace)}
        />
      </Paper>
    </CardText>
  </Card>
);

Job.propTypes = {
  job: PropTypes.instanceOf(Object).isRequired,
};

export default Job;
