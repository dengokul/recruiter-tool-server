import lodash from "lodash";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Shared } from "./utils/typeDefsShared.js";
import TimestampType from "./utils/customTypes/Timestamp.js";
import GraphQLJSON from "graphql-type-json";
import { typeDef as Candidate, resolvers as candidateResolvers } from "./candidates.js";

const { merge } = lodash;

const Query = `
  type Query {
    _empty: String
  }
  scalar Timestamp
  scalar JSON
`;

const timestampResolvers = {
  Timestamp: TimestampType,
};

const jsonResolvers = {
  JSON: GraphQLJSON,
};

export default makeExecutableSchema({
  typeDefs: [Query, Shared, Candidate],
  resolvers: merge(
    timestampResolvers,
    jsonResolvers,
    candidateResolvers,
  ),
});
