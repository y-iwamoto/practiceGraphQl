import { graphql } from "../../ggl";

export const getUsersQueryDocument = graphql(`
  query GetUsers {
    users {
      id
      email
      firstName
      lastName
    }
  }
`)
