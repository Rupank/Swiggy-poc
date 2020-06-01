import React from 'react'
import SliderWithLabelDummy from './SliderWithLabelDummy';
import * as _ from "lodash";

function ListByCatFilter(props) {
    const {list} = props;
    // debugger;
    return (
        list.map((indItem, value) => (
            <SliderWithLabelDummy key={value} item={_.keys(indItem)[0]} children={_.keys(indItem[_.keys(indItem)[0]])} childrenValues={_.values(indItem[_.keys(indItem)[0]])} />
        ))
    )
}

export default ListByCatFilter
