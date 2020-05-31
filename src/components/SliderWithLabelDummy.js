import React, { useState } from 'react'
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import CheckBoxWithLabel from './CheckBoxWithLabel';
import * as _ from 'lodash';

function SliderWithLabelDummy(props) {
    const { item, children, childrenValues } = props;

    const [checked, setChecked] = useState(false);
    const [suggestedRefurbs, setRefurbs] = useState({});
    const handleChange = (event) => {
        setChecked(!checked);
    };
    const handleClickCheckBox = (val, checkBoxLabel, actions, index) => {
        if (actions) {
            actions = actions[index][0];
            if (actions['RF Action Node 2']) {
                if (val) {
                    let obj = {};
                    obj[checkBoxLabel] = actions['RF Action Node 2'];
                    setRefurbs({ ...Object.assign(suggestedRefurbs, obj) });
                } else {
                    setRefurbs(_.omit(suggestedRefurbs, checkBoxLabel));
                }
            }
        }
    };

    if (children && children.length > 0) {
        return <div className="stepTileFullWidth" key={item}>
            <Button className='stepTileBtn' variant="contained" onClick={handleChange}>
                <div>
                    <div className="sliderLable">
                        {item}
                    </div>
                    < Switch
                        checked={checked}
                        color="primary"
                        name="checked"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
            </Button>
            <div className="checkBoxParent">
                {checked && children.map((child, index) =>
                    <CheckBoxWithLabel key={child} label={child} handleClicked={(val) => {
                        handleClickCheckBox(val, child, childrenValues, index)
                    }} />
                )}
                {checked && _.values(suggestedRefurbs).length > 0 &&
                    <div className="checkBoxContainer">
                        <div className="refurbParent">
                            <div className = "refurbHeading">Suggested Refurb</div>
                            <div className="refurbValues">{_.values(suggestedRefurbs).join(", ")}</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    }
    return null;
}

export default SliderWithLabelDummy;
