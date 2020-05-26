import React from 'react';
import * as _ from "lodash";
import data from './../data/data.json';
import SwitchList from '../components/SwitchList';
function Homepage() {
    let parsedData = data["Sheet1"];
    let object = _.groupBy(parsedData, "Process Sequence ");
    object = _.mapValues(object, x => x.map(y => _.omit(y, "Process Sequence ")));
    
    return (<div>
        <SwitchList key={"root"} nestedObj={object} item="Login" filterKey="Node 1" showChildren = {true}  />
    </div>)
}

export default Homepage;

