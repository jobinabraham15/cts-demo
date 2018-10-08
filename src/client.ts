import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, concat } from "apollo-link";
import pubsub from "utils/pubsub";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjkyMjU5YjM1LWQ4MzUtNDhhMi1iNzExLWUzYTU2MDE1ZWMzNyIsInVzZXJfdHlwZSI6IlBBIiwibmFtZSI6IkpvYmluIEFicmFoYW0iLCJlbnRpdHlfaWQiOiIyMTk5In0.wc5Z08MkVK0vzjVdadROv-O7DgWQYGhudZtk91pbRms";
// Todo: Implement an inheritance of apolloLink which add an abort signal to the
const customFetch = (uri, options) => {
  
  const { signal } = options.headers;
  options.headers.signal = undefined;
  const allOptions = { ...options, signal };
  return fetch(`http://graphql.aasaanjobs.net/`, allOptions);
};

const link = createHttpLink({
  fetch: customFetch
});

// Add Auth Headers here
const authMiddleware = new ApolloLink((operation, forward: any) => {
  operation.setContext(context => {
    return {
      ...context,
      headers: {
        ...context.headers,
        Authorization: `Bearer ${token}`
      }
    };
  });
  return forward(operation);
});

// Use this to add pubsub signals to the operation
// Right Now the implementation is on "operation.operationName". 
// Need to figure out a token system to identify which queries to add to the abort pub sub
class AddSignal extends ApolloLink {
  request(operation: any, forward: any) {
    const controller = new AbortController();
    const signal = controller.signal;
    pubsub.publish("abort_" + operation.operationName);
    pubsub.unsubscribe("abort_" + operation.operationName);
    pubsub.subscribe("abort_" + operation.operationName, () => {
      controller.abort();
    });

    operation.setContext(context => {
      return {
        ...context,
        headers: {
          ...context.headers,
          signal
        }
      };
    });
    return forward(operation);
  }
}

// Check if the operation is abortable here
const isAbortable = operation => {
  return (
    operation.query &&
    operation.query.context &&
    operation.query.context.abortable
  );
};

const newLinks = ApolloLink.from([
  authMiddleware,
  ApolloLink.split(isAbortable, new AddSignal())
]);

// Export Appollo client here
export const apolloClient = new ApolloClient({
  link: concat(newLinks, link),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "ignore"
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all"
    }
  }
});
