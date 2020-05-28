import { PARSE_DATA_REQUESTED, PARSE_DATA_SUCCESSFUL, FILTER_INNER_DATA_SUCCEDED, ROOT_FILTER_APPLIED } from './types';
import data from "../data/data.json";
import * as _ from 'lodash';


export const parseData = () => (dispatch) => {
    dispatch({
        type: PARSE_DATA_REQUESTED,
    });
    let parsedData = data["Sheet1"];
    let newObject = {};
    let object = _.groupBy(parsedData, "Process Sequence ");
    object = _.mapValues(object, x => x.map(y => _.omit(y, "Process Sequence ")));
    newObject = object;
    console.log("Before", newObject);
    let nodesArray = ['Node 1', 'Node 2', 'Node 3'];

    let filterKey = "Node 1";
    groupObject2(newObject, filterKey);

    filterKey = "Node 2";
    groupObject2(newObject, filterKey);

    filterKey = "Node 3";
    groupObject2(newObject, filterKey);

    cleanUp(newObject);
    dispatch({
        type: PARSE_DATA_SUCCESSFUL,
        payload: { data: newObject }
    });
    console.log("After", newObject);
}


export const applyRootFilter = (filter, data) => (dispatch) => {
    dispatch({
        type: ROOT_FILTER_APPLIED,
        payload: { rootFilter: filter, filteredData: Object.keys(data[filter]['Node 1']) }
    });
}

export const filterInnerData = (rootFilter, data, innerFilter) => (dispatch) => {
    let finalList = [];
    if (innerFilter === "Right Head Light Support") {
        // debugger;
    }
    if (innerFilter === "AC") {
        // debugger;
    }
    // Checks Node 1
    let node1FilterKey = 'Checks Node 1';
    let innerData = data['Node 1'][innerFilter];
    let node1Data = groupByAndRemove(innerData, node1FilterKey);
    let node1Keys = doCleanup(innerData, node1FilterKey);

    if (_.keys(node1Keys).length === 0) {
        // check for relationship between Node 1 and Issues Node 1
        node1FilterKey = "Issues Node 1";
        node1Data = groupByAndRemove(innerData, node1FilterKey)
    }

    // Get Outcomes Value Keys
    else {
        let keys = _.keys(node1Keys);
        let refArr = [];
        for (const key of keys) {
            let obj = groupByAndRemove(node1Data[key], 'Outcome Number');
            node1Keys[key] = _.keys(obj).join(",");
        }
    }

    let node2FilterKey = "Node 2";
    let node2InnerKey = 'Issues Check Node 2';
    let node2Data = groupByAndRemove(innerData, node2FilterKey, node2InnerKey);
    let node2Keys = doCleanup(innerData, node2FilterKey, node2InnerKey);

    if (_.keys(node2Keys).length === 0) {

    }
    // Get Outcome Dependent (Upper node)
    else {
        let keys = _.keys(node2Keys);
        let refArr = [];
        for (const key of keys) {
            let obj = groupByAndRemove(node2Data[key], 'Outcome Dependent (Upper node)', 'Issues Check Node 2');
            let newObj = {};
            // newObj[key] = obj;
            let filterParam = _.keys(obj);
            if (filterParam && filterParam.length > 0) {
                for (let j of filterParam) {
                    node2Keys[key][j] = true;
                }
            }
        }
    }

    let node3FilterKey = "Node 3";
    let node3InnerKey = 'Issues Check Node 3';
    // let node3Data = groupByAndRemove(innerData, node3FilterKey, node3InnerKey);

    let node3Keys = doCleanup(innerData, node3FilterKey, node3InnerKey);

    if (innerFilter === "AC") {
        // debugger;
    }
    // debugger;
    finalList.push(node1Keys, node2Keys, node3Keys);

    dispatch({
        type: FILTER_INNER_DATA_SUCCEDED,
        payload: { key: `${rootFilter}_${innerFilter}`, value: finalList }
    });
}

function doCleanup(newObject, filterKey, innerFilter) {
    if (!newObject) {
        debugger;
    }

    let obj = _.groupBy(newObject, filterKey);
    obj = _.mapValues(obj, x => x.map(y => _.omit(y, filterKey)));
    // let notFound = false;
    obj = _.omit(obj, "undefined");
    if (innerFilter && Object.keys(obj).length !== 0) {
        let innerKeys = Object.keys(obj);
        for (const key of innerKeys) {
            groupByAndRemove(obj[key], innerFilter, null);
        }
    }
    newObject[filterKey] = obj;

    let keys = _.keys(newObject[filterKey]);
    for (const key of keys) {
        for (let i = 0; i < newObject[filterKey][key].length; i++) {
            if (i !== innerFilter) {
                delete newObject[filterKey][key][i];
            } else {
                debugger;
            }
        }
    }
    return newObject[filterKey];
}
function groupByAndRemove(newObject, filterKey, innerFilter) {
    if (!newObject) {
        debugger;
    }

    let obj = _.groupBy(newObject, filterKey);
    obj = _.mapValues(obj, x => x.map(y => _.omit(y, filterKey)));
    // let notFound = false;
    obj = _.omit(obj, "undefined");
    if (innerFilter && Object.keys(obj).length !== 0) {
        let innerKeys = Object.keys(obj);
        for (const key of innerKeys) {
            groupByAndRemove(obj[key], innerFilter, null);
        }
    }
    newObject[filterKey] = obj;

    // let keys = _.keys(newObject[filterKey]);
    // for (const key of keys) {
    //     for (let i = 0; i < newObject[filterKey][key].length; i++) {
    //         if (i !== innerFilter) {
    //             delete newObject[filterKey][key][i];
    //         } else {
    //             debugger;
    //         }
    //     }
    // }
    return newObject[filterKey];
}

function cleanUp(newObject) {
    let keys = Object.keys(newObject);
    for (const key of keys) {

        let node1 = newObject[key]['Node 1'];
        let node2 = newObject[key]['Node 2'];
        let node3 = newObject[key]['Node 3'];
        newObject[key] = [];
        // delete newObject[key];
        newObject[key]['Node 1'] = node1;
        newObject[key]['Node 2'] = node2;
        newObject[key]['Node 3'] = node3;
    }
}
function groupObject2(newObject, filterKey, doCleanup) {
    let keys = Object.keys(newObject);
    for (const key of keys) {
        let obj = _.groupBy(newObject[key], filterKey);
        obj = _.mapValues(obj, x => x.map(y => _.omit(y, filterKey)));
        // let notFound = false;
        obj = _.omit(obj, "undefined");
        newObject[key][filterKey] = obj;
    }
}

function groupObject(newObject, filterKey, innerFilterKey) {
    let keys = Object.keys(newObject);
    for (const key of keys) {
        let obj = _.groupBy(newObject[key], filterKey);
        // obj = _.mapValues(obj, x => x.map(y => _.omit(y, [...nodesArray,'Issues Check Node 2'])));
        obj = _.mapValues(obj, x => x.map(y => _.omit(y, filterKey)));
        obj = _.omit(obj, "undefined");
        let innerTempKeys = Object.keys(obj);
        if (innerTempKeys.length === 0) {
            if (filterKey === "Checks Node 1" && innerFilterKey === 'Node 2') {
                obj = _.groupBy(newObject[key], innerFilterKey);
                obj = _.mapValues(obj, x => x.map(y => _.omit(y, innerFilterKey)));
                obj = _.omit(obj, "undefined");
                if (Object.keys(obj).length === 0) {
                    // Issues Node 1
                    obj = _.groupBy(newObject[key], 'Issues Node 1');
                    obj = _.mapValues(obj, x => x.map(y => _.omit(y, 'Issues Node 1')));
                    obj = _.omit(obj, "undefined");
                }
                // groupObject(newObject[key], innerFilterKey, 'Issues Check Node 2');
            }
            else if (filterKey === "Node 2" && innerFilterKey === 'Issues Check Node 2') {
                obj = _.groupBy(newObject[key], innerFilterKey);
                obj = _.mapValues(obj, x => x.map(y => _.omit(y, innerFilterKey)));
                obj = _.omit(obj, "undefined");
                // groupObject(newObject[key], innerFilterKey, 'Issues Check Node 2');
            }
        }
        let newInnerValue = {};
        newInnerValue[filterKey] = obj;
        // Node 2 inside Node 1
        if (innerFilterKey !== null && innerFilterKey !== undefined) {

            // check for Node 2 Inside Checks Node 1
            if (filterKey === "Node 1" && innerFilterKey === 'Checks Node 1') {
                groupObject(obj, innerFilterKey, 'Node 2');
            }

            // check for Issues Check Node 2 inside Node 2
            if (filterKey === "Checks Node 1" && innerFilterKey === 'Node 2') {
                groupObject(obj, innerFilterKey, 'Issues Check Node 2');
            }


        }
        newObject[key] = null;
        delete newObject[key];
        newObject[key] = newInnerValue;
        // newObject[key] = _.remove(newObject[key], (x,index) => {
        //     if(index === filterKey){
        //     }
        //     return x;
        // } );
    }
}
