import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import ItemsPerPage from './ItemsPerPage';
import Pages from './Pages';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Pager = ({
  onChangeItemsPerPage,
  onChangePage,
  itemsPerPage,
  currentPage,
  pages,
}) => (
  <Paper zDepth={2} style={{ margin: '0.5rem' }}>
    <Wrapper>
      <ItemsPerPage
        onChange={onChangeItemsPerPage}
        itemsPerPage={itemsPerPage}
      />
      <Pages
        pages={pages}
        onChange={onChangePage}
        value={currentPage}
      />
    </Wrapper>
  </Paper>
);

Pager.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeItemsPerPage: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pager;
