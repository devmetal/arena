const Job = require('./jobType');
const PageInfo = require('./pageInfoType');

const PaginatedJobs = `
  type PaginatedJobs {
    pageInfo: PageInfo
    edges: [Job]
  }
`;

export default () => [PaginatedJobs, PageInfo, Job];
