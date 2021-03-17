/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/client';
import React from 'react';
import { feedQuery, feedQuery_feed_links } from '../gql/__generated__/feedQuery';
import { FEED_QUERY } from '../gql/query';
import { Link } from './Link';

export const LinkList = (): JSX.Element => {
    const { data } = useQuery<feedQuery>(FEED_QUERY);

    return (
        <div>
            {data && (
                <>
                    {data.feed.links.map((link: feedQuery_feed_links, index: number) => (
                        <Link key={link.id} link={link} index={index} />
                    ))}
                </>
            )}
        </div>
    );
};
