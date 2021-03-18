/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateTime } from "../../commons/@types/scalar";

// ====================================================
// GraphQL subscription operation: newLinkSubscription
// ====================================================

export interface newLinkSubscription_newLink_postedBy {
  __typename: "User";
  id: string;
  name: string;
}

export interface newLinkSubscription_newLink_votes_user {
  __typename: "User";
  id: string;
}

export interface newLinkSubscription_newLink_votes {
  __typename: "Vote";
  id: string;
  user: newLinkSubscription_newLink_votes_user;
}

export interface newLinkSubscription_newLink {
  __typename: "Link";
  id: string;
  url: string;
  description: string;
  postedBy: newLinkSubscription_newLink_postedBy | null;
  votes: newLinkSubscription_newLink_votes[];
  createdAt: DateTime;
}

export interface newLinkSubscription {
  newLink: newLinkSubscription_newLink | null;
}
