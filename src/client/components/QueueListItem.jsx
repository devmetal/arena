import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListItem } from 'material-ui/List';

const QueueListItem = ({ name, hostId }) => (
  <ListItem
    primaryText={(
      <div>
        <Link to={`/${hostId}/${name}`}>
          {name}
        </Link>
      </div>
    )}
    secondaryText={hostId}
  />
);

QueueListItem.propTypes = {
  name: PropTypes.string.isRequired,
  hostId: PropTypes.string.isRequired,
};

export default QueueListItem;
