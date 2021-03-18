import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import { CreateLink } from './components/CreateLink';
import { Header } from './components/Header';
import { LinkList } from './components/LinkList';
import { Login } from './components/Login';
import { Search } from './components/search';

const App = (): JSX.Element => {
    const redirectNewPost = (): JSX.Element => {
        return <Redirect to="/new/1" />;
    };

    return (
        <div className="ph3 pv1 background-gray">
            <Header />
            <div className="ph3 pv1 background-gray">
                <Switch>
                    <Route exact path="/" render={redirectNewPost} />
                    <Route exact path="/create" component={CreateLink} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/new/:page" component={LinkList} />
                </Switch>
            </div>
        </div>
    );
};

export { App };
