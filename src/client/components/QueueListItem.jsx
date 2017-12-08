import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListItem } from 'material-ui/List';

const QueueListItem = ({ name, hostId }) => (
  <Link to={`/${hostId}/${name}`}>
    <ListItem
      primaryText={(
        <div>
          {name}
        </div>
      )}
      secondaryText={hostId}
    />
  </Link>
);

QueueListItem.propTypes = {
  name: PropTypes.string.isRequired,
  hostId: PropTypes.string.isRequired,
};

export default QueueListItem;
