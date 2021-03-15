import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import { CreateLink } from './components/CreateLink';
import { Header } from './components/Header';
import { LinkList } from './components/LinkList';
import { Login } from './components/Login';

const App = (): JSX.Element => {
    return (
        <div className="ph3 pv1 background-gray">
            <Header />
            <div className="ph3 pv1 background-gray">
                <Switch>
                    <Route exact path="/" component={LinkList} />
                    <Route exact path="/create" component={CreateLink} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </div>
        </div>
    );
};

export { App };
