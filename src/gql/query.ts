import { gql } from '@apollo/client';

export const FEED_QUERY = gql`
    query feedQuery {
        feed {
            id
            links {
                id
                createdAt
                url
                description
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
                createdAt
            }
        }
    }
`;

export const FEED_SEARCH_QUERY = gql`
    query FeedSearchQuery($filter: String!) {
        feed(filter: $filter) {
            id
            links {
                id
                url
                description
                createdAt
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
            }
        }
    }
`;

export const NEW_LINKS_SUBSCRIPTION = gql`
    subscription newLinkSubscription {
        newLink {
            id
            url
            description
            postedBy {
                id
                name
            }
            votes {
                id
                user {
                    id
                }
            }
            createdAt
        }
    }
`;
