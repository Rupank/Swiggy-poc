import React, { useState } from 'react'
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import CheckBoxWithLabel from './CheckBoxWithLabel';
import * as _ from 'lodash';
import RefurbList from './RefurbList';

function SliderWithLabelDummy(props) {
    const { item, children, childrenValues } = props;
    const [checked, setChecked] = useState((item === undefined) ? true : false);
    const [suggestedRefurbs, setRefurbs] = useState({});
    const handleChange = (event) => {
        setChecked(!checked);
    };

    const removeRefurbOnDeleteClick = (value) => {
        console.log(suggestedRefurbs);
        let obj = suggestedRefurbs;
        const keys = _.keys(suggestedRefurbs);
        for (const key of keys) {
            if (suggestedRefurbs[key] === value) {
                delete obj[key];
            }
        }

        setRefurbs({ ...Object.assign(obj) });
    }
    const handleClickCheckBox = (val, checkBoxLabel, actions, index) => {
        if (actions) {

            if (actions['RF Action Node 1']) {
                if (val) {
                    let obj = {};
                    obj[checkBoxLabel] = actions['RF Action Node 1'];
                    setRefurbs({ ...Object.assign(suggestedRefurbs, obj) });
                } else {
                    setRefurbs(_.omit(suggestedRefurbs, checkBoxLabel));
                }
            }
            else {
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
        }
    };

    if (children && children.length > 0) {
        return <div className="stepTileFullWidth" key={children.length}>
            {item !== undefined && <Button className='stepTileBtn' variant="contained" onClick={handleChange}>
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
            </Button>}
            <div className="checkBoxParent">
                {item && checked && children.map((child, index) =>
                    <CheckBoxWithLabel key={child} label={child} handleClicked={(val) => {
                        handleClickCheckBox(val, child, childrenValues, index)
                    }} />
                )}
                {
                    !item && children && children.map((child, index) =>
                        <CheckBoxWithLabel key={child} label={child} handleClicked={(val) => {
                            handleClickCheckBox(val, child, childrenValues[index], index)
                        }} />
                    )
                }
                {checked && <RefurbList suggestedRefurbs={_.uniq(_.values(suggestedRefurbs))} removeRefurb={removeRefurbOnDeleteClick} />}
            </div>
        </div>
    }
    return null;
}

export default SliderWithLabelDummy;
