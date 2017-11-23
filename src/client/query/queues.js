const query = `
query Queues {
  queues {
    name
    hostId
    details {
      redisStats
      jobCounts
    }
  }
}
`;
