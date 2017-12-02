import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Timestamp = ({ secounds }) => {
  const mom = moment(secounds);
  const fromNow = mom.fromNow();
  const formatted = mom.format();
  
  return <span>{formatted}, {fromNow}</span>;
};

Timestamp.propTypes = {
  secounds: PropTypes.number.isRequired,
};

export default Timestamp;
