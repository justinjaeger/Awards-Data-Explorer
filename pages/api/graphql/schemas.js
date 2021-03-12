import { gql } from "apollo-server-micro"; 

/* SCHEMAS */

export const typeDefs = gql`

  scalar Bit
  scalar Datetime
  scalar Void

  type User {
    user_id: ID!
    email: String!
    username: String!
    password: String!
    admin: Bit!
    authenticated: Bit!
    image: String
    dateCreated: String
    lastLoggedIn: String
  }

  type Token {
    access_token: String!
    user_id: Int!
  }

  type Follower {
    username: String!
    follower: String!
    dateCreated: String
  }

  type VoidResponse {
    void: Void
  }

  type Query {
    getUsers: [User]
    getUser(user_id: ID!): User!
    getUserByUsername(username: String!): User!
    getFollowers(username: String!): [User]
    getFollowing(follower: String!): [User]
  }

  type Mutation {
    followUser(username: String!, follower: String!): VoidResponse
    unfollowUser(username: String!, follower: String!): VoidResponse
  }
`;

/*
NOTES:
- I might just want to leave the email controller stuff alone
and have a mix
- You do not want too specific functionality to take place 
in the API. shuld be as universal as possible
- I'm not going to revamp what I already have
- Maybe I will just create a data graph for the Airtable API

 Queries to do:
 - Find/check a follower relationship
 - Count the numberr of followers
 - Count the number following

 Mutations to do:
 - all login routes
 - upload profile picture

 */