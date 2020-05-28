import React, { useState, memo } from 'react'
import * as _ from "lodash";
import Switch from '@material-ui/core/Switch';
import CheckBoxWithLabel from './CheckBoxWithLabel';
import './SwitchList.css';

function SwitchList({ nestedObj, item, filterKey, showChildren }) {

    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(!checked);
    };

    if (!showChildren) {
        return null;
    }
    const final = [];
    const keys = Object.keys(nestedObj);
    for (const key of keys) {
        let nextFilter = "";
        switch (filterKey) {
            case "Process Sequence ":
                nextFilter = "Node 1";
                break;
            case "Checks Node 1":
                nextFilter = "END";
                break;
            case "Node 1":
                nextFilter = "Node 2";
                break;
            case "Node 2":
                nextFilter = "Issues Check Node 2";
                break;
            case "Issues Check Node 2":
                nextFilter = "END";
                break;
            default:
                break;
        }

        if (nextFilter && key !== undefined && key !== "undefined") {
            console.log("Going in 1");
            let obj = _.groupBy(nestedObj[key], filterKey);
            obj = _.mapValues(obj, x => x.map(y => _.omit(y, filterKey)));
            if (filterKey === "Checks Node 1") {
                nextFilter = "Issues Check Node 2";
            }
            final.push(
                <SwitchList key={key} nestedObj={obj} item={key} filterKey={nextFilter} showChildren={checked} />
            )
        }
        else if (key === "undefined" && filterKey === "Issues Check Node 2") {
            // check if Checks Node 1 key exists
            console.log("going in 2", key, filterKey);
            filterKey = "Checks Node 1";

            let obj = _.groupBy(nestedObj[key], filterKey);
            obj = _.mapValues(obj, x => x.map(y => _.omit(y, filterKey)));
            // Key does not exist
            if (obj['undefined']) {
                //TODO:: Issues Node 1 Exists Or Either Node 3 exists




                filterKey = "Issues Check Node 2";
                // else check if Issues Check Node 2 Exists
                obj = _.groupBy(obj['undefined'], filterKey);
                obj = _.mapValues(obj, x => x.map(y => _.omit(y, filterKey)));
                if (obj['undefined']) {
                    // Issues Node 1 possible in keys
                    // debugger;
                }
                else {
                    let keys = Object.keys(obj);
                    for (let key of keys) {
                        final.push(
                            // <li key={key} >{key} </li>
                            <CheckBoxWithLabel key={key} label = {key} />
                        );
                    }
                }

            }

            // Checks Node 1 Exists
            else {
                let count = 0;
                let checkNode1Keys = Object.keys(obj);
                nextFilter = "END";
                for (let key of checkNode1Keys) {
                    final.push(
                        <CheckBoxWithLabel key={key} label = {key} />
                        // <li key={key} >{key} </li>
                    )
                }
            }
        }
        else if (key !== undefined) {
            console.log("Going in 3");
            final.push(
                // <li key={key} >{key} </li>
                <CheckBoxWithLabel key={key} label = {key} />
            )
        }

    }

    return (
        <>
            <div>
                {item}
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    color="primary"
                    name="checked"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>
            {checked &&
                <div className ={'checkBoxList'}>
                    {final}
                </div>
            }
        </>
    )
}

export default memo(SwitchList);