import React from 'react';
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

const Job = ({ job }) => (
  <Card style={style}>
    <CardHeader
      title={`#${job.id}`}
      subtitle={
        <Timestamp secounds={+job.timestamp} />
      }
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
      <FlatButton primary label="Restart" />
      <FlatButton secondary label="Remove" />
    </CardActions>
    <CardText expandable={true}>
      <Paper zDepth={1} style={{padding: '1rem'}}>
        <DataTitle>Data</DataTitle>
        <Highlight lang="json" value={JSON.stringify(job.data, undefined, 2)} />
      </Paper>
      <Paper zDepth={1} style={{padding: '1rem'}}>
        <DataTitle>Return Value</DataTitle>
        <Highlight lang="json" value={
          `${JSON.stringify(job.returnvalue, undefined, 2)}`}
        />
      </Paper>
      <Paper zDepth={1} style={{padding: '1rem'}}>
        <DataTitle>Stacktrace</DataTitle>
        <Highlight lang="json" value={
          `${JSON.stringify(job.stacktrace, undefined, 2)}`}
        />
      </Paper>
    </CardText>
  </Card>
);

export default Job;
