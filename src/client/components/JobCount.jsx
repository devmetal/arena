import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader,  CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const style = {
  width: '20rem',
  margin: '0.5rem',
};

const JobCount = ({ state, count, match }) => (
  <Card style={style}>
    <CardHeader title={`${state} ${count}`} />
    <CardActions>
      <Link
        to={`${match.url}/jobs/${state}`}
      >
        <RaisedButton primary label="Jobs" />
      </Link>
    </CardActions>
  </Card>
);

JobCount.propTypes = {
  state: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

export default JobCount;
