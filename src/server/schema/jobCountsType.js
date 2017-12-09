const JobCounts = `
  type JobCounts {
    waiting: Int
    active: Int
    completed: Int
    failed: Int
    delayed: Int
  }
`;

module.exports.typedef = () => [JobCounts];
