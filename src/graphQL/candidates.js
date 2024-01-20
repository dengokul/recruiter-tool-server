import { gql } from "apollo-server";
import { MyError } from "../helpers/errorHandler.js";
import { prisma } from "../db/prisma.js";

const User = {}

export const typeDef = gql`
  type ResponsePayload {
    responseCode: String!
    data: JSON
  }
  
  input CandidatesCond {
    search: JSON
  }
  
  input DeleteCandidateInput {
    id: ID!
  }
  input CandidateInput {
    id: ID
    name: String!
    email: String!
    phoneNumber: String!
    qualifications: String!
    status: String!
    reactjsExp: String!
    nodejsExp: String!
    expectedSalary: Int!
  }

  extend type Query {
    getCandidates(input: CandidatesCond): ResponsePayload
  }

  type Mutation {
    createCandidate(input: CandidateInput): ResponsePayload
    updateCandidate(input: CandidateInput): ResponsePayload
    deleteCandidate(input: DeleteCandidateInput): ResponsePayload
  }
`;

export const resolvers = {
  Query: {
    getCandidates: async (root, args, ctx) => {
      try {

        const { input } = args;
        const { search } = input;
        const cond = {}
        if (search) {
          if (search.cid) {
            cond.id = search.cid;
          }
        }
        const users = await prisma.user.findMany({
          where: {
            ...(cond),
          },
        });

        return {
          responseCode: "1",
          data: users,
        };
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createCandidate: async (root, args) => {
      try {

        const { input } = args;
        const { name, email, phoneNumber, qualifications, status, reactjsExp, nodejsExp, expectedSalary } = input;

        if (!(name && email && phoneNumber && qualifications && status && reactjsExp && nodejsExp && expectedSalary)) return new Error("Invalid Request!");

        let createData = {
          name,
          email,
          phoneNumber,
          qualifications,
          status,
          reactjsExp,
          nodejsExp,
          expectedSalary,
          computedScore: parseInt(reactjsExp) + parseInt(nodejsExp)
        };

        const row = await prisma.user.create({
          data: createData
        });
        if (!row) return new Error("Candidate Creation Failed!");

        return {
          responseCode: "1",
          data: [row],
        };
      } catch (err) {
        throw `[CreateCandidateError: ${err}]`;
      }
    },
    updateCandidate: async (root, args) => {
      try {

        const { input } = args;
        const { id, name, email, phoneNumber, qualifications, status, reactjsExp, nodejsExp, expectedSalary } = input;

        if (!(id && name && email && phoneNumber && qualifications && status && reactjsExp && nodejsExp && expectedSalary)) return new Error("Invalid Request!");

        let updateData = {
          name,
          email,
          phoneNumber,
          qualifications,
          status,
          reactjsExp,
          nodejsExp,
          expectedSalary,
          computedScore: parseInt(reactjsExp) + parseInt(nodejsExp)
        };

        const row = await prisma.user.update({
          where: {
            id
          },
          data: updateData
        });
        if (!row) return new Error("Candidate Update Failed!");

        return {
          responseCode: "1",
          data: [row],
        };
      } catch (err) {
        throw `[UpdateCandidateError: ${err}]`;
      }
    },
    deleteCandidate: async (root, args) => {
      try {

        const { input } = args;
        const { id } = input;

        if (!(id)) return new Error("Invalid Request!");

        const deleteUser = await prisma.user.delete({
          where: { id }
        })

        if (!deleteUser) return new Error("Candidate Delete Failed!");

        return {
          responseCode: "1",
          data: [deleteUser],
        };
      } catch (err) {
        throw `[DeleteCandidateError: ${err}]`;
      }
    }
  },
};
