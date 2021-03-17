/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateTime } from "../../commons/@types/scalar";

// ====================================================
// GraphQL query operation: FeedSearchQuery
// ====================================================

export interface FeedSearchQuery_feed_links_postedBy {
  __typename: "User";
  id: string;
  name: string;
}

export interface FeedSearchQuery_feed_links_votes_user {
  __typename: "User";
  id: string;
}

export interface FeedSearchQuery_feed_links_votes {
  __typename: "Vote";
  id: string;
  user: FeedSearchQuery_feed_links_votes_user;
}

export interface FeedSearchQuery_feed_links {
  __typename: "Link";
  id: string;
  url: string;
  description: string;
  createdAt: DateTime;
  postedBy: FeedSearchQuery_feed_links_postedBy | null;
  votes: FeedSearchQuery_feed_links_votes[];
}

export interface FeedSearchQuery_feed {
  __typename: "Feed";
  id: string;
  links: FeedSearchQuery_feed_links[];
}

export interface FeedSearchQuery {
  feed: FeedSearchQuery_feed;
}

export interface FeedSearchQueryVariables {
  filter: string;
}
