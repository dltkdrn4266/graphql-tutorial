/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LinkOrderByInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: feedQuery
// ====================================================

export interface feedQuery_feed_links_postedBy {
  __typename: "User";
  id: string;
  name: string;
}

export interface feedQuery_feed_links_votes_user {
  __typename: "User";
  id: string;
}

export interface feedQuery_feed_links_votes {
  __typename: "Vote";
  id: string;
  user: feedQuery_feed_links_votes_user;
}

export interface feedQuery_feed_links {
  __typename: "Link";
  id: string;
  createdAt: DateTime;
  url: string;
  description: string;
  postedBy: feedQuery_feed_links_postedBy | null;
  votes: feedQuery_feed_links_votes[];
}

export interface feedQuery_feed {
  __typename: "Feed";
  id: string;
  links: feedQuery_feed_links[];
  count: number;
}

export interface feedQuery {
  feed: feedQuery_feed;
}

export interface feedQueryVariables {
  take?: number | null;
  skip?: number | null;
  orderBy?: LinkOrderByInput | null;
}
