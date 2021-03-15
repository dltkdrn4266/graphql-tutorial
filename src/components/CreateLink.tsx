import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { CREATE_LINK_MUTATION } from '../gql/createlinkmutation';

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
        onCompleted: () => history.push('/'),
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
