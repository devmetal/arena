const PageInfo = `
  type PageInfo {
    currentPage: Int
    itemsPerPage: Int
    pages: [Int]
  }
`;

export default () => [PageInfo];
