import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableRowColumn,
  TableRow,
} from 'material-ui/Table';

const RedisStats = ({
  redisStats: {
    redisVersion,
    totalSystemMemory,
    usedMemory,
    memFragmentationRatio,
    connectedClients,
    blockedClients,
  },
}) => (
  <div style={{ margin: '0.5rem' }}>
    <Table selectable={false}>
      <TableBody displayRowCheckbox={false}>
        <TableRow>
          <TableRowColumn>Redis Version</TableRowColumn>
          <TableRowColumn>{redisVersion}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>Total System Memory</TableRowColumn>
          <TableRowColumn>{totalSystemMemory}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>Used Memory</TableRowColumn>
          <TableRowColumn>{usedMemory}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>Memory Fragmentation Ratio</TableRowColumn>
          <TableRowColumn>{memFragmentationRatio}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>Connected Clients</TableRowColumn>
          <TableRowColumn>{connectedClients}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>Blocked Clients</TableRowColumn>
          <TableRowColumn>{blockedClients}</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);

RedisStats.propTypes = {
  redisStats: PropTypes.instanceOf(Object).isRequired,
};

export default RedisStats;
