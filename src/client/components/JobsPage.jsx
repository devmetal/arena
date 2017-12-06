import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import deepmerge from 'deepmerge';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import query from '../query/queueJobs';
import Pager from './Pager';
import Job from './Job';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: strech;
`;

class JobsPage extends Component {
  static propTypes = {
    loadPage: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      queue: PropTypes.instanceOf(Object),
    }).isRequired,
    match: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    itemsPerPage: 10,
    currentPage: 1,
  };

  setItemsPerPage = (n) => {
    this.setState({
      itemsPerPage: n,
      currentPage: 1,
    });
    this.props.loadPage(1, n);
  }

  setCurrentPage = (n) => {
    const { itemsPerPage } = this.state;
    this.setState({ currentPage: n });
    this.props.loadPage(n, itemsPerPage);
  }

  render() {
    const { data } = this.props;

    if (data.loading) {
      return null;
    }

    const {
      queue: {
        name,
        hostId,
        details: {
          jobList,
        },
      },
    } = data;

    const {
      match: {
        params: {
          type,
        },
      },
    } = this.props;

    return (
      <div>
        <AppBar
          title={`${hostId}/${name} ${type} jobs`}
          showMenuIconButton={false}
        />
        <div>
          <Pager
            onChangeItemsPerPage={this.setItemsPerPage}
            onChangePage={this.setCurrentPage}
            itemsPerPage={this.state.itemsPerPage}
            currentPage={this.state.currentPage}
            pages={jobList.pageInfo.pages}
          />
        </div>
        <Flex>
          {jobList.edges.map(job => (
            <Job key={job.id} job={job} />
          ))}
        </Flex>
      </div>
    );
  }
}

export default graphql(query, {
  options: ({ match: { params } }) => ({
    variables: {
      name: params.queueName,
      hostId: params.hostId,
      state: params.type,
      currentPage: 1,
      itemsPerPage: 10,
    },
  }),
  props: ({ data, ownProps }) => {
    const { match: { params } } = ownProps;
    const loadPage = (page, itemsPerPage = 10) => {
      const { queueName, hostId, type } = params;

      const variables = {
        name: queueName,
        currentPage: page,
        state: type,
        itemsPerPage,
        hostId,
      };

      const updateQuery = (
        previousResult,
        { fetchMoreResult },
      ) =>
        deepmerge(
          previousResult,
          fetchMoreResult,
          { arrayMerge: (d, s) => s },
        );

      return data.fetchMore({
        variables,
        updateQuery,
      });
    };

    return {
      loadPage,
      data,
    };
  },
})(JobsPage);
