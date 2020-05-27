import React from 'react'
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage';
import Content from './pages/Content';

const Router = () => {
    return (
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/steps/' component={Content} />
        </Switch>
    )
}

export default Router
