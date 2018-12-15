import "reflect-metadata";
import { ApolloServer, ApolloError } from "apollo-server";
import { buildSchema, Resolver, Query } from "type-graphql";
import { GraphQLError } from "graphql";

@Resolver()
class SimpleResolver {
  @Query(() => String)
  hello() {
    throw new ApolloError("bad stuff");
  }
}

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [SimpleResolver]
  });

  const server = new ApolloServer({
    schema,
    formatError: (e: GraphQLError) => {
      if (e instanceof ApolloError) {
        console.log("you should see me");
      }

      return e;
    }
  });

  const { url } = await server.listen(4000);
  console.log(`🚀  Server ready at ${url}`);
}

bootstrap();
