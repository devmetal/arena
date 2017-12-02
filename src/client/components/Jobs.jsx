import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import deepmerge from 'deepmerge';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import query from '../query/queueJobs';
import Job from '../components/Job';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: strech;
`;

class Jobs extends Component {
  static propTypes = {
    loadPage: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      queue: PropTypes.instanceOf(Object),
    }).isRequired,
  };

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
        <AppBar title={`${hostId}/${name} ${type} jobs`} showMenuIconButton={false} />
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
    const loadPage = (page) => {
      const { queueName, hostId, type } = params;

      const variables = {
        name: queueName,
        currentPage: page,
        itemsPerPage: 10,
        state: type,
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
})(Jobs);
