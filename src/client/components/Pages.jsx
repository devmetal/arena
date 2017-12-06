import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: 15px;
  display: flex;
  line-height: 36px;
`;

const BtnGroup = styled.div`
  display: flex;
`;

export default class extends Component {
  static propTypes = {
    pages: PropTypes.arrayOf(PropTypes.number).isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleClick = (page) => {
    this.props.onChange(page);
  }

  render() {
    const { pages, value } = this.props;

    return (
      <Wrapper>
        <div style={{ fontSize: '13px' }}>Page:</div>
        <BtnGroup>
          {pages.map(p => (
            <FlatButton
              primary
              key={p}
              label={p}
              disabled={p === value}
              onClick={() => this.handleClick(p)}
            />
          ))}
        </BtnGroup>
      </Wrapper>
    );
  }
}
