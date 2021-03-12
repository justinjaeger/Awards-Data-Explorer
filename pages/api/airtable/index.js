import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from 'pages/api/graphql/schemas'
import { resolvers } from 'pages/api/graphql/resolvers'

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/airtable' })