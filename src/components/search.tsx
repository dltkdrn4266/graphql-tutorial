/* eslint-disable jsx-a11y/anchor-is-valid */
import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { FeedSearchQuery } from '../gql/__generated__/FeedSearchQuery';
import { FEED_SEARCH_QUERY } from '../gql/query';
import { Link } from './Link';

export const Search = (): JSX.Element => {
    const [searchFilter, setSearchFilter] = useState('');
    const [executeSearch, { data }] = useLazyQuery<FeedSearchQuery>(FEED_SEARCH_QUERY);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFilter(e.target.value);
    };

    const onClickButton = () => {
        executeSearch({
            variables: {
                filter: searchFilter,
            },
        });
    };

    return (
        <>
            <div>
                Search
                <input type="text" onChange={onChangeInput} />
                <button type="button" onClick={onClickButton}>
                    OK
                </button>
            </div>
            {data && data.feed.links.map((link, index) => <Link key={link.id} link={link} index={index} />)}
        </>
    );
};
