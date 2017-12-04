import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import deepmerge from 'deepmerge';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
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

  state = {
    itemsPerPage: 10,
  };

  setItemsPerPage = (e, i, val) => {
    this.setState({ itemsPerPage: val });
    this.props.loadPage(1, val);
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
          <DropDownMenu
            value={this.state.itemsPerPage}
            onChange={this.setItemsPerPage}
          >
            <MenuItem value={10} primaryText="10" />
            <MenuItem value={50} primaryText="50" />
            <MenuItem value={100} primaryText="100" />
            <MenuItem value={500} primaryText="500" />
            <MenuItem value={1000} primaryText="1000" />
          </DropDownMenu>
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
})(Jobs);
