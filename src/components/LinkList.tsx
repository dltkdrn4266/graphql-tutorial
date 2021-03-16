/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useQuery } from '@apollo/client';
import React from 'react';
import { FEED_QUERY } from '../gql/query';
import { Link } from './Link';

export const LinkList = (): JSX.Element => {
    const { data } = useQuery(FEED_QUERY);
    return (
        <div>
            {data && (
                <>
                    {data.feed.links.map(
                        (
                            link: {
                                id: any;
                                description: string;
                                url: string;
                                postedBy: { id: string; name: string };
                                votes: { id: string; user: { id: string } }[];
                                createdAt: Date;
                            },
                            index: number,
                        ) => (
                            <Link key={link.id} link={link} index={index} />
                        ),
                    )}
                </>
            )}
        </div>
    );
};
