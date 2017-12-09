const Job = `
  type Job {
    id: ID!
    data: Json
    returnvalue: Json
    stacktrace: Json
    timestamp: String
    attemptsMade: Int
    failedReason: String
    progress: Int
    state: String
  }
`;

module.exports.typedef = () => [Job];

module.exports.resolvers = {
  progress(parent) {
    return parent._progress;
  },
  async state(parent) {
    return parent.getState();
  },
};
