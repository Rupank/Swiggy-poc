import React, { useState } from 'react'
import * as _ from 'lodash';
import CheckBoxWithLabel from '../components/CheckBoxWithLabel';
import SliderWithLabelDummy from '../components/SliderWithLabelDummy';
import ListByCatFilter from '../components/ListByCatFilter';
function InnerContent(props) {
    const { filters } = props;
    const allOkKey = 'All Ok';
    const initalState = {
        'All Ok': true
    }
    const [checkBox, setCheckBox] = useState({});
    const handleChangeCheckBox = (key, value) => {
        // if (key === allOkKey) {
        //     value = true;
        // }
        let obj = {};
        obj[key] = value;
        setCheckBox({ ...checkBox, ...Object.assign(checkBox, obj) });
    };

    const dataNode1 = filters[0];
    const dataNode2 = filters[1];
    const dataNode3 = filters[2];
    let finalValues = [];
    let filterRefNode1 = _.values(dataNode1);
    let filterRefNode2 = _.values(dataNode2);
    if (filterRefNode1.length > 0 && filterRefNode2.length > 0) {
        let allOkArr = [];
        let removeArr = [];
        for (let i = 0; i < filterRefNode1.length; i++) {
            let refKey = _.keys(dataNode1)[i];
            const keys = _.keys(dataNode2);
            let innerArr = [];
            for (const key of keys) {
                let obj = {};
                let innerElement = dataNode2[key]['Issues Check Node 2'];
                obj[key] = innerElement;

                if (dataNode2[key][filterRefNode1[i]]) {
                    innerArr.push(obj);
                    removeArr[key] = innerElement;
                }
                else {
                    if (!allOkArr[key]) {
                        allOkArr[key] = innerElement;
                    }
                }
            }
            finalValues[allOkKey] = [];
            finalValues[refKey] = innerArr;
        }
        let keys = _.keys(finalValues);
        allOkArr = _.omit(allOkArr, _.keys(removeArr));
        let newArr = [];
        let allOkKeys = _.keys(allOkArr);
        for (let indkey of allOkKeys) {
            let obj = {};
            obj[indkey] = allOkArr[indkey];
            newArr.push(obj);
        }
        allOkArr = newArr;
        finalValues[allOkKey] = allOkArr;

    } else if (filterRefNode1.length == 0) {
        const keys = _.keys(dataNode2);
        let innerArr = [];
        let allOkArr = [];
        for (const key of keys) {
            let innerElement = dataNode2[key]['Issues Check Node 2'];
            finalValues[key] = innerElement;
        }
    }

    // Display Issues Node 1
    else if (filterRefNode1.length > 0 && filterRefNode2.length == 0) {
        const keys = _.keys(dataNode1);
        let innerArr = [];
        let allOkArr = [];
        for (const key of keys) {
            let innerElement = dataNode1[key][0];
            finalValues[key] = innerElement;
        }
    }

    // If Node 1 Issues does not exits (for ex in steps 3 AC, (its node 1 inner checkboxes does not exits))
    if (filterRefNode1.length === 0) {
        return <div className="innerContainerParent">
            {
                _.keys(finalValues).map(item => (
                    <SliderWithLabelDummy key={`${item}`} item={item} children={_.keys(finalValues[item])}
                        childrenValues={_.values(finalValues[item])}
                    />
                ))
            }
        </div>
    }

    if (filterRefNode1.length !== 0 && filterRefNode2.length === 0) {
        return <div className="innerContainerParent">
            {
                // _.keys(finalValues).map(item => (
                <SliderWithLabelDummy children={_.keys(finalValues)}
                    childrenValues={_.values(finalValues)}
                />
                // ))
            }
        </div>
    }
    return (
        <>
            <div className="checkBoxParent">
                {
                    filterRefNode1.length > 0 && _.keys(finalValues).map((item) => (
                        <CheckBoxWithLabel key={item} label={item} handleClicked={(val) => handleChangeCheckBox(item, val)} />
                    ))
                }
            </div>

            <div className="innerStepsParent">
                {
                    _.keys(finalValues).map((item, index) => (
                        checkBox[item] &&
                        <ListByCatFilter key={index} list={finalValues[item]} />
                        // finalValues[item].map((indItem, value) => (
                        //     <SliderWithLabelDummy key={value} item={_.keys(indItem)[0]} children={_.keys(indItem[_.keys(indItem)[0]])} childrenValues={_.values(indItem[_.keys(indItem)[0]])} />
                        // ))
                    ))
                }
            </div>

        </>
    )
}

export default InnerContent
