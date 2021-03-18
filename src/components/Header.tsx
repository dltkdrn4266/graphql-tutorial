import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants/constants';

export const Header = (): JSX.Element => {
    const history = useHistory();
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const onClickLogout = () => {
        localStorage.removeItem(AUTH_TOKEN);
        history.push('/login');
    };

    return (
        <div className="flex pal justify-between nowrap orange">
            <div className="flex flex-fixed black">
                <div className="fw7 mr1">Hacker News</div>
                <Link to="/" className="ml1 no-underline black">
                    new
                </Link>
                <div className="ml1">|</div>
                <Link to="/top" className="ml1 no-underline black">
                    top
                </Link>
                <div className="ml1">|</div>
                <Link to="/search" className="ml1 no-underline black">
                    search
                </Link>
                {authToken && (
                    <div className="flex">
                        <div className="ml1">|</div>
                        <Link to="/create" className="ml1 no-underline black">
                            submit
                        </Link>
                    </div>
                )}
            </div>
            <div className="flex flex-fixed">
                {authToken ? (
                    <button type="button" className="ml1 pointer black" onClick={onClickLogout}>
                        logout
                    </button>
                ) : (
                    <Link to="/login" className="ml1 no-underline black">
                        login
                    </Link>
                )}
            </div>
        </div>
    );
};
