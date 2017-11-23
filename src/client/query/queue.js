const query = `
query Queue($name: String!, $hostId: String!) {
  queue(name: $name, hostId: $hostId) {
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
