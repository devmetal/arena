const PageInfo = `
  type PageInfo {
    currentPage: Int
    itemsPerPage: Int
    pages: [Int]
  }
`;

module.exports.typedef = () => [PageInfo];
