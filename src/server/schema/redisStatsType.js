const RedisStats = `
  type RedisStats {
    redisVersion: String
    totalSystemMemory: String
    usedMemory: String
    memFragmentationRatio: String
    connectedClients: String
    blockedClients: String
  }
`;

module.exports.typedef = () => [RedisStats];
