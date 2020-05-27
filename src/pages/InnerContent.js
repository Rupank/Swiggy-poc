import React from 'react'
import * as _ from 'lodash';
import './homepage.css';
import SliderWithLabelDummy from '../components/SliderWithLabelDummy';
function InnerContent(props) {
    const { filters } = props;
    const dataNode1 = filters[0];
    const dataNode2 = filters[1];
    const dataNode3 = filters[2];
    console.log("Displaying Inner Content", dataNode1, dataNode2, dataNode3);
    let node1final = [];
    node1final = _.keys(dataNode1);
    let itemValue=[];
    let itemInnerValues={};
    for (let i = 0; i < filters.length; i++) {
        if (filters[i]) {
            let keys = _.keys(filters[i]);
            if (keys.length > 0) {
                for(const key of keys){
                    itemValue.push(key);
                    let innerKeys1 = _.keys(filters[i][key]);
                        for(let key1 of innerKeys1){
                            if(filters[i][key][key1]){
                                let innerKeys = _.keys(filters[i][key][key1]);
                                itemInnerValues[key] = innerKeys;
                            }
                        }
                }
            }
        }
    }

    return (
        <div className="innerContainerParent">
            {
                itemValue.map(item=>(
                    <SliderWithLabelDummy key={item} item={item} children={itemInnerValues[item]}/>
                ))
            }
        </div>
    )
}

export default InnerContent
