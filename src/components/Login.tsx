/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { AUTH_TOKEN } from '../constants/constants';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../gql/authmutation';

export const Login = (): JSX.Element => {
    const history = useHistory();
    const [formState, setFormState] = useState({
        login: true,
        email: '',
        password: '',
        name: '',
    });

    const [loginMutation] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: formState.email,
            password: formState.password,
        },
        onCompleted: ({ login }) => {
            localStorage.setItem(AUTH_TOKEN, login.token);
            history.push('/');
        },
    });

    const [signupMutation] = useMutation(SIGNUP_MUTATION, {
        variables: {
            email: formState.email,
            name: formState.name,
            password: formState.password,
        },
        onCompleted: ({ signup }) => {
            localStorage.setItem(AUTH_TOKEN, signup.token);
            history.push('/');
        },
    });

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            name: e.target.value,
        });
    };

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            email: e.target.value,
        });
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            password: e.target.value,
        });
    };

    const onClickChangeLogin = () => {
        setFormState({
            ...formState,
            login: !formState.login,
        });
    };

    const onClickButton = async () => {
        if (formState.login) {
            await loginMutation();
        } else {
            await signupMutation();
        }
    };

    return (
        <div>
            <h4 className="mv3">{formState.login ? 'Login' : 'Sign Up'}</h4>
            <div className="flex flex-column">
                {!formState.login && (
                    <input value={formState.name} onChange={onChangeName} type="text" placeholder="your name" />
                )}
                <input value={formState.email} onChange={onChangeEmail} type="text" placeholder="email" />
                <input value={formState.password} onChange={onChangePassword} type="text" placeholder="password" />
            </div>
            <div className="flex mt3">
                <button type="button" className="pointer mr2 button" onClick={onClickButton}>
                    {formState.login ? 'login' : 'create account'}
                </button>
                <button type="button" className="pointer button" onClick={onClickChangeLogin}>
                    {formState.login ? 'need to create an account?' : 'already have an account?'}
                </button>
            </div>
        </div>
    );
};
