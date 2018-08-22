import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, concat } from "apollo-link";
import { addSignalController } from "pubsub/requestSignals";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjkyMjU5YjM1LWQ4MzUtNDhhMi1iNzExLWUzYTU2MDE1ZWMzNyIsInVzZXJfdHlwZSI6IlBBIiwibmFtZSI6IkpvYmluIEFicmFoYW0iLCJlbnRpdHlfaWQiOiIyMTk5In0.wc5Z08MkVK0vzjVdadROv-O7DgWQYGhudZtk91pbRms";

const customFetch = (uri, options) => {
  console.log("options", options);
  // add the authorization to the headers
  const controller = new AbortController();
  const signal = controller.signal;
  
  // operation.setContext({
  //   signal
  // });
  addSignalController(controller);
  // const { operationName } = JSON.parse(options.body);

  // const headers =  {
  //   Authorization: `Bearer ${token}`
  // };
  const allOptions = { ...options, signal };
  console.log("allOptions", allOptions);
  return fetch(`http://graphql.aasaanjobs.net/`, allOptions);
};

const authMiddleware = new ApolloLink((operation, forward: any) => {
  
  console.log("operation", operation);
  return forward(operation);
});

const link = createHttpLink({
  fetch: customFetch,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// export const apolloClient = new ApolloClient({
//   uri: "http://graphql.aasaanjobs.net/", // Put this in app config
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });

// const link = new HttpLink({
//   uri: 'https://example.com/graphql',
//   // Additional fetch options like `credentials` or `headers`
//   credentials: 'same-origin',
// });
//   const controller = new AbortController();
//   const signal = controller.signal;
// const link = new HttpLink({
//   uri: "http://graphql.aasaanjobs.net/",
//   headers: {
//     Authorization: `Bearer ${token}`
//   },
//   signal: signal
// });

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache()
});
