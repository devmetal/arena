import gql from 'graphql-tag';

export default gql`
query QueueJobs(
  $name: String!, 
  $hostId: String!,
  $state: String!,
  $currentPage: Int!,
  $itemsPerPage: Int!,
) {
  queue(
    name: $name, 
    hostId: $hostId
  ) {
    id
    name
    hostId
    details {
      jobList(
        state: $state, 
        currentPage: $currentPage, 
        itemsPerPage: $itemsPerPage
      ) {
        edges {
          id,
          data,
          timestamp,
          attemptsMade,
          returnvalue,
          stacktrace,
          failedReason,
          progress,
          state
        },
        pageInfo {
          pages
        }
      }
    }
  }
}
`;
