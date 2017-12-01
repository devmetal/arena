import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const QueueListItem = ({ name, hostId }) => (
  <div className="item">
    <Link to={`/${hostId}/${name}`}>{hostId} / <b>{name}</b></Link>
  </div>
);

QueueListItem.propTypes = {
  name: PropTypes.string.isRequired,
  hostId: PropTypes.string.isRequired,
};

export default QueueListItem;
