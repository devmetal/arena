import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, withRouter } from 'react-router-dom';

const style = {
  width: '20rem',
  margin: '0.5rem',
};

const JobCount = ({ state, count, match }) => (
  <Card style={style}>
    <CardHeader title={count} subtitle={state} />
    <CardActions>
      <Link
        to={`${match.url}/jobs/${state}`}
      >
        <RaisedButton fullWidth primary label="View Jobs" />
      </Link>
    </CardActions>
  </Card>
);

JobCount.propTypes = {
  state: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(JobCount);
