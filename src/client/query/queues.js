import gql from 'graphql-tag';

export default gql`
query Queues {
  queues {
    id
    name
    hostId
    details {
      redisStats {
        redisVersion
        totalSystemMemory
        usedMemory
      }
    }
  }
}
`;
