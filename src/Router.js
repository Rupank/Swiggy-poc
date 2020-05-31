import React from 'react'
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage';
import Content from './pages/Content';
import Inspectionpage from './pages/inspectionpage';
import DataLoader from './components/DataLoader';

const Router = () => {
    return (
        <>
            <DataLoader />
            <Switch>
                <Route exact path='/' component={Inspectionpage} />
                <Route exact path='/homepage' component={HomePage} />
                <Route exact path='/:id' component={Content} />
            </Switch>
        </>
    )
}

export default Router
