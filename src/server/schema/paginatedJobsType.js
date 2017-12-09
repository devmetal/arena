const Job = require('./jobType');
const PageInfo = require('./pageInfoType');

const PaginatedJobs = `
  type PaginatedJobs {
    pageInfo: PageInfo
    edges: [Job]
  }
`;

module.exports.typedef = () => [PaginatedJobs, PageInfo.typedef, Job.typedef];
