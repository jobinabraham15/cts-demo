import { apolloClient } from "client";
import { signals } from "pubsub/requestSignals";

export const gQLFetch: (
  query: any,
  variables?: any,
  errorPolicy?: "none" | "ignore" | "all" | undefined
) => Promise<any> = (query, variables, errorPolicy = "all") => {
  // window.setTimeout(
  //   () => {
  //     signals[0].abort();
  //   },
  //   100);
  const data = apolloClient.query({
    query: query,
    variables: variables,
    errorPolicy: errorPolicy
  });

  console.log("data", data);
  console.log("signals", signals);
  // if (signals[0]) {
  //   signals[0].abort();
  //   // window.setTimeout(
  //   // () => {
  //   //   signals[0].abort();
  //   // },
  //   // 100);
  // }
  return data;
};
