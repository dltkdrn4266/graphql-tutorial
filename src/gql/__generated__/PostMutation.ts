/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PostMutation
// ====================================================

export interface PostMutation_post {
  __typename: "Link";
  id: string;
  createdAt: DateTime;
  url: string;
  description: string;
}

export interface PostMutation {
  post: PostMutation_post;
}

export interface PostMutationVariables {
  description: string;
  url: string;
}
