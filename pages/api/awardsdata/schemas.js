import { gql } from "apollo-server-micro"; 

/* SCHEMAS */

export const typeDefs = gql`

  type Fields {
    AwardsShow: String!
    Year: String!
    category: String!
    specification: String
    film: String!
    nominee: String!
    winner: String!
  }

  type Sort {
    field: String
    direction: String
  }

  type Nominees {
    fields: [Fields]
    maxRecords: Int
    formula: String
    sort: [Sort]
  }

  type Query {
    getNominees: [Nominees]
  }

`;
