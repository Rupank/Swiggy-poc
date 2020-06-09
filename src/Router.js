import React, { memo } from 'react'
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage';
import Node1List from './pages/Node1List';
import Inspectionpage from './pages/inspectionpage';
import DataLoader from './components/DataLoader';

const Router = () => {
    return (
        <>
            <DataLoader />
            <Switch>
                <Route exact path='/' component={Inspectionpage} />
                <Route exact path='/homepage' component={HomePage} />
                <Route exact path='/:id' component={Node1List} />
            </Switch>
        </>
    )
}

export default memo(Router)
