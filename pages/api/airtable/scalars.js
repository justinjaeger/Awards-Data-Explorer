import { GraphQLScalarType, Kind } from "graphql";

/* SCALARS */

const Datetime = new GraphQLScalarType({
  name: 'Datetime',
  description: 'Datetime custom scalar type',
  serialize(value) { // Convert to JSON
    // For output i.e. response for graphql
    const valueAsString = value.toISOString();
    if (isISO8601(valueAsString)) {
      return valueAsString;
    }
    throw new Error('serializeISO8601: DateTime cannot represent an invalid ISO-8601 Date string');
  },
  parseValue(value) { // Converts JSON back to original thing
    if (isISO8601(value)) {
      return new Date(value);
    }
    throw new Error('parseISO8601: DateTime cannot represent an invalid ISO-8601 Date string');
  },
  parseLiteral(ast) { // Convert AST string to original thing
    // For input payload i.e. for mutation
    if (isISO8601(ast.value)) {
      return new Date(ast.value);
    }
    throw new Error('parseLiteralISO8601: DateTime cannot represent an invalid ISO-8601 Date string');
  },
});

const Bit = new GraphQLScalarType({
  name: 'Bit',
  description: 'Bit custom scalar type',
  serialize(value) { // Convert to something JSON friendly
    return value[0]
  },
  parseValue(value) { // Converts incoming thing from above to
    return value
  },
  parseLiteral(ast) { // Convert AST string to original thing
   return ast.data[0]
  },
});

const Void = new GraphQLScalarType({
  name: 'Void',
  description: 'Represents NULL values',
  serialize() {
      return null
  },
  parseValue() {
      return null
  },
  parseLiteral() {
      return null
  }
})
  
module.exports = { Datetime, Bit, Void };
