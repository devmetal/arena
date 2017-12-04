import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
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
  <div>
    <Table>
      <TableBody>
        <TableRow>
          <TableHeaderColumn>Redis Version</TableHeaderColumn>
          <TableRowColumn>{redisVersion}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn>Total System Memory</TableHeaderColumn>
          <TableRowColumn>{totalSystemMemory}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn>Connected Clients</TableHeaderColumn>
          <TableRowColumn>{connectedClients}</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
    <div>Ver.: {redisVersion}</div>
    <div>Total Mem.: {totalSystemMemory}</div>
    <div>Used Mem.: {usedMemory}</div>
  </div>
);

RedisStats.propTypes = {
  redisStats: PropTypes.instanceOf(Object).isRequired,
};

export default RedisStats;
