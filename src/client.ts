import ApolloClient from "apollo-boost";
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjkyMjU5YjM1LWQ4MzUtNDhhMi1iNzExLWUzYTU2MDE1ZWMzNyIsInVzZXJfdHlwZSI6IlBBIiwibmFtZSI6IkpvYmluIEFicmFoYW0iLCJlbnRpdHlfaWQiOiIyMTk5In0.wc5Z08MkVK0vzjVdadROv-O7DgWQYGhudZtk91pbRms";
export const client = new ApolloClient({
  uri: "http://graphql.aasaanjobs.net/", // Put this in app config
  headers: {
    Authorization: `Bearer ${token}`
  }
});
