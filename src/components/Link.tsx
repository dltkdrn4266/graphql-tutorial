/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation } from '@apollo/client';
import React from 'react';
import { AUTH_TOKEN, LINKS_PER_PAGE } from '../constants/constants';
import { feedQuery, feedQuery_feed_links } from '../gql/__generated__/feedQuery';
import { VOTE_MUTATION } from '../gql/mutation';
import { FEED_QUERY } from '../gql/query';
import { timeDifferenceForDate } from '../utils/utils';

interface Props {
    link: feedQuery_feed_links;
    index: number;
}

export const Link = (props: Props): JSX.Element => {
    const { link, index } = props;
    const authToken = localStorage.getItem(AUTH_TOKEN);

    const take = LINKS_PER_PAGE;
    const skip = 0;
    const orderBy = { createdAt: 'desc' };

    const [voteMutation] = useMutation(VOTE_MUTATION, {
        variables: {
            linkId: link.id,
        },
        update(cache, { data: { vote } }) {
            const data: feedQuery | null = cache.readQuery({
                query: FEED_QUERY,
            });
            const updatedLinks = data?.feed.links.map((feedLink) => {
                if (feedLink.id === link.id) {
                    return {
                        ...feedLink,
                        votes: [...feedLink.votes, vote],
                    };
                }
                return feedLink;
            });

            cache.writeQuery({
                query: FEED_QUERY,
                data: {
                    feed: {
                        links: updatedLinks,
                    },
                },
            });
        },
    });

    const onClickButton = async () => {
        await voteMutation();
    };

    return (
        <div className="flex mt2 items-start">
            <div className="flex items-center">
                <span className="gray">{index + 1}</span>
                {authToken && (
                    <div className="ml1 gray f11" style={{ cursor: 'pointer' }} onClick={onClickButton}>
                        ▲
                    </div>
                )}
            </div>
            <div className="ml1">
                <div>
                    {link.description} ({link.url})
                </div>
                {authToken && (
                    <div className="f6 lh-copy gray">
                        {link.votes.length} votes | by {link.postedBy ? link.postedBy.name : 'unknown'}{' '}
                        {timeDifferenceForDate(link.createdAt)}
                    </div>
                )}
            </div>
        </div>
    );
};
