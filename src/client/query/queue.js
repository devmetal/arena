import gql from 'graphql-tag';

export default gql`
query Queue($name: String!, $hostId: String!) {
  queue(name: $name, hostId: $hostId) {
    id
    name
    hostId
    details {
      redisStats {
        redisVersion
        totalSystemMemory
        usedMemory
        memFragmentationRatio
        connectedClients
        blockedClients
      }
      jobCounts {
        waiting
        active
        completed
        failed
        delayed
      }
    }
  }
}
`;
