import { gql } from "apollo-server";

export const Shared = gql`
  type TotalCount {
    totalCount: Int
  }

  input Paginate {
    offset: Int
    limit: Int
    currentPage: Int
  }
`;
