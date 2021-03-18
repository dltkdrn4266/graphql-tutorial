/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router';
import { LINKS_PER_PAGE } from '../constants/constants';
import { feedQuery } from '../gql/__generated__/feedQuery';
import { FEED_QUERY, NEW_LINKS_SUBSCRIPTION } from '../gql/query';
import { getQueryVariables } from '../utils/utils';
import { Link } from './Link';

export const LinkList = (): JSX.Element => {
    const history = useHistory();
    const newPage = history.location.pathname.includes('new');
    const pageIndexParams = history.location.pathname.split('/');
    const page = parseInt(pageIndexParams[pageIndexParams.length - 1], 10);
    const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;
    const { data, loading, error, subscribeToMore } = useQuery(FEED_QUERY, {
        variables: getQueryVariables(newPage, page),
        fetchPolicy: 'network-only',
    });

    const onClickPreviousButton = () => {
        if (page > 1) {
            history.push(`/new/${page - 1}`);
        }
    };

    const onClickNextButton = () => {
        if (page <= data.feed.count / LINKS_PER_PAGE) {
            history.push(`/new/${page + 1}`);
        }
    };

    const getLinksToRender = (isNewPage: boolean, pageData: feedQuery) => {
        if (isNewPage) {
            return pageData.feed.links;
        }
        const rankedList = pageData.feed.links.slice();
        rankedList.sort((l1, l2) => l2.votes.length - l1.votes.length);
        return rankedList;
    };

    subscribeToMore({
        document: NEW_LINKS_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
                return prev;
            }
            const newlink = subscriptionData.data.newLink;
            const exists = prev.feed.links.find((id: string) => id === newlink.id);
            if (exists) {
                return prev;
            }

            return {
                ...prev,
                feed: {
                    links: [newlink, ...prev.feed.links],
                    count: prev.feed.links.length - 1,
                    __typename: prev.feed.__typename,
                },
            };
        },
    });

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {data && (
                <>
                    {getLinksToRender(newPage, data).map((link, index) => (
                        <Link key={link.id} link={link} index={index + pageIndex} />
                    ))}
                </>
            )}
            {newPage && (
                <div className="flex ml1 mv3 gray">
                    <button type="button" className="pointer mr2" onClick={onClickPreviousButton}>
                        Previous
                    </button>
                    <button type="button" className="pointer" onClick={onClickNextButton}>
                        Next
                    </button>
                </div>
            )}
        </>
    );
};
