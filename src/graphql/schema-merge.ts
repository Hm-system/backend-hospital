import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

// Load schema files
const typesArray = loadFilesSync('./src/graphql/**/*.graphql', {
  recursive: true,
});

// Merge schema types
const typeDefs = mergeTypeDefs(typesArray);

// Create an executable schema
export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
});
