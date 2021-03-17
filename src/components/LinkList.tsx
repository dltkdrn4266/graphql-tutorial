/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router';
import { LINKS_PER_PAGE } from '../constants/constants';
import { feedQuery, feedQuery_feed_links } from '../gql/__generated__/feedQuery';
import { newLinkSubscription } from '../gql/__generated__/newLinkSubscription';
import { FEED_QUERY, NEW_LINKS_SUBSCRIPTION } from '../gql/query';
import { getQueryVariables } from '../utils/utils';
import { Link } from './Link';

export const LinkList = (): JSX.Element => {
    const history = useHistory();
    const isNewPage = history.location.pathname.includes('new');
    const pageIndexParams = history.location.pathname.split('/');
    const page = parseInt(pageIndexParams[pageIndexParams.length - 1], 10);
    const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

    const { data, loading, error, subscribeToMore } = useQuery<newLinkSubscription | undefined>(FEED_QUERY, {
        variables: getQueryVariables(isNewPage, page),
    });

    // subscribeToMore({
    //     document: NEW_LINKS_SUBSCRIPTION,
    //     updateQuery: (prev, { subscriptionData }) => {
    //         if (!subscriptionData.data) {
    //             return prev;
    //         }
    //         const newlink = subscriptionData.data.newLink;
    //         const exists =
    //     },
    // });
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
