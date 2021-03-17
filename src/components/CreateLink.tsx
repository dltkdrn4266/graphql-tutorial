import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { LINKS_PER_PAGE } from '../constants/constants';
import { feedQuery } from '../gql/__generated__/feedQuery';
import { CREATE_LINK_MUTATION } from '../gql/createlinkmutation';
import { FEED_QUERY } from '../gql/query';

export const CreateLink = (): JSX.Element => {
    const history = useHistory();
    const [formState, setFormState] = useState({
        description: '',
        url: '',
    });

    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            description: formState.description,
            url: formState.url,
        },
        update: (cache, { data: { post } }) => {
            const take = LINKS_PER_PAGE;
            const skip = 0;
            const orderBy = { createdAt: 'desc' };

            const data: feedQuery | null = cache.readQuery({
                query: FEED_QUERY,
                variables: {
                    take,
                    skip,
                    orderBy,
                },
            });

            if (data) {
                cache.writeQuery({
                    query: FEED_QUERY,
                    data: {
                        feed: {
                            links: [...data.feed.links, post],
                        },
                    },
                });
            }
        },
        onCompleted: () => history.push('/new/1'),
    });

    const inputOnChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            description: e.target.value,
        });
    };

    const inputOnChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            url: e.target.value,
        });
    };

    const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createLink();
    };

    return (
        <div>
            <form onSubmit={formOnSubmit}>
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={formState.description}
                        onChange={inputOnChangeDescription}
                        type="text"
                        placeholder="A description for the link"
                    />
                    <input
                        className="mb2"
                        value={formState.url}
                        onChange={inputOnChangeUrl}
                        type="text"
                        placeholder="A URL for the link"
                    />
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
    );
};
