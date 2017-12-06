import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
  }

  handleChange = (e, i, v) => {
    this.props.onChange(v);
  }

  render() {
    return (
      <SelectField
        floatingLabelText="Items per page"
        value={this.props.itemsPerPage}
        onChange={this.handleChange}
      >
        <MenuItem value={10} primaryText="10" />
        <MenuItem value={50} primaryText="50" />
        <MenuItem value={100} primaryText="100" />
        <MenuItem value={500} primaryText="500" />
        <MenuItem value={1000} primaryText="1000" />
      </SelectField>
    );
  }
}
