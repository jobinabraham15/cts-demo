import { apolloClient } from "client";
// import { QueryOptions } from "../../node_modules/apollo-client";
export const gQLFetch: (
  query: any,
  variables?: any,
  errorPolicy?: "none" | "ignore" | "all" | undefined
) => Promise<any> = (query, variables, errorPolicy = "all") => {
  const options = {
    query: {
      ...query,
      context: {
        "abortable": true
      }
    },
    variables: variables,
    errorPolicy: errorPolicy,
  };
  const data = apolloClient.query(options);
  return data;
};
