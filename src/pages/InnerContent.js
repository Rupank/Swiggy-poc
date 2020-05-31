import React, { useState } from 'react'
import * as _ from 'lodash';
import CheckBoxWithLabel from '../components/CheckBoxWithLabel';
import SliderWithLabelDummy from '../components/SliderWithLabelDummy';
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
    let filterRefs = _.values(dataNode1);
    if (filterRefs.length > 0) {
        for (let i = 0; i < filterRefs.length; i++) {
            let refKey = _.keys(dataNode1)[i];
            const keys = _.keys(dataNode2);
            let innerArr = [];
            let allOkArr = [];
            for (const key of keys) {
                let obj = {};
                let innerElement = dataNode2[key]['Issues Check Node 2'];
                obj[key] = innerElement;

                if (dataNode2[key][filterRefs[i]]) {
                    innerArr.push(obj);
                }
                else {
                    allOkArr.push(obj);
                }
            }
            finalValues[allOkKey] = allOkArr;
            finalValues[refKey] = innerArr;
        }
    } else {
        const keys = _.keys(dataNode2);
        let innerArr = [];
        let allOkArr = [];
        for (const key of keys) {
            let innerElement = dataNode2[key]['Issues Check Node 2'];
            finalValues[key] = innerElement;
        }
    }
    let node1final;
    node1final = _.keys(dataNode1);
    let itemValue = [];
    let itemInnerValues = {};

    // If Node 1 Issues does not exits (for ex in steps 3 AC, (its node 1 inner checkboxes does not exits))
    if (filterRefs.length === 0) {
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
    return (
        <>
            <div className="checkBoxParent">
                {
                    filterRefs.length > 0 && _.keys(finalValues).map((item) => (
                        <CheckBoxWithLabel key={item} label={item} handleClicked={(val) => handleChangeCheckBox(item, val)} />
                    ))
                }
            </div>

            <div className="innerStepsParent">
                {
                    _.keys(finalValues).map(item => (
                        checkBox[item] &&
                        finalValues[item].map((indItem, value) => (
                            <SliderWithLabelDummy key={value} item={_.keys(indItem)[0]} children={_.keys(indItem[_.keys(indItem)[0]])} childrenValues={_.values(indItem[_.keys(indItem)[0]])} />
                        ))
                    ))
                }
            </div>

        </>
    )
}

export default InnerContent
