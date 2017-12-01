import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import deepmerge from 'deepmerge';
import query from '../query/queueJobs';

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
        details: {
          jobList,
        },
      },
    } = data;

    return (
      <div>
        {jobList.edges.map(job => (
          <div key={job.id}>
            #{job.id}
            <div>{JSON.stringify(job.returnvalue)}</div>
          </div>
        ))}
        <button
          onClick={() => this.props.loadPage(3)}
        >
          Load next page
        </button>
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
