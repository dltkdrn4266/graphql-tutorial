/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUpMutation
// ====================================================

export interface SignUpMutation_signup {
  __typename: "AuthPayload";
  token: string | null;
}

export interface SignUpMutation {
  signup: SignUpMutation_signup | null;
}

export interface SignUpMutationVariables {
  email: string;
  password: string;
  name: string;
}
