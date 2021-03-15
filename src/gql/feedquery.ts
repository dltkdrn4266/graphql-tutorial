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
            }
        }
    }
`;
