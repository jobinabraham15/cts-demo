import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, concat } from "apollo-link";
import pubsub from "utils/pubsub";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjkyMjU5YjM1LWQ4MzUtNDhhMi1iNzExLWUzYTU2MDE1ZWMzNyIsInVzZXJfdHlwZSI6IlBBIiwibmFtZSI6IkpvYmluIEFicmFoYW0iLCJlbnRpdHlfaWQiOiIyMTk5In0.wc5Z08MkVK0vzjVdadROv-O7DgWQYGhudZtk91pbRms";

const customFetch = (uri, options) => {
  console.log("options", options);
  // // add the authorization to the headers
  const { signal } = options.headers;
  options.headers.signal = undefined;
  const allOptions = { ...options, signal };
  return fetch(`http://graphql.aasaanjobs.net/`, allOptions);
};

const authMiddleware = new ApolloLink((operation, forward: any) => {
  console.log("operation", operation);
  const controller = new AbortController();
  const signal = controller.signal;
  pubsub.publish("abort_" + operation.operationName);
  pubsub.unsubscribe("abort_" + operation.operationName);
  pubsub.subscribe("abort_" + operation.operationName, () => {
    console.log("controller", controller);
    controller.abort();
  });

  operation.setContext({
    headers: {
      signal: signal
    }
  });
  return forward(operation);
});

const link = createHttpLink({
  fetch: customFetch,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, link),
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
