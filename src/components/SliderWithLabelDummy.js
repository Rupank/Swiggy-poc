import React, { useState, useEffect } from 'react'
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import '../pages/homepage.css';

function SliderWithLabelDummy(props) {
    const { item, children } = props;
    console.log(item, children);
    const [checked, setChecked] = useState(false);
    const [checkBoxChecked, setCheckBox] = useState(false);
    const handleChange = (event) => {
        setChecked(!checked);
    };

    const handleChangeCheckBox = (event) => {
        setCheckBox(!checkBoxChecked);
    };

    if (children && children.length > 0) {
        return <div className="stepTileFullWidth" key={item}>
            <Button className='stepTileBtn' variant="contained">
                <div>
                    <div className="sliderLable">
                        {item}
                    </div>
                    < Switch
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                        name="checked"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
            </Button>
            <div className="checkBoxParent">
                {checked && children.map(child =>
                    <SliderWithLabelDummy key={child} item={child} />)}
            </div>
        </div>
    }
    else {
        return (
        <div className="checkBoxContainer">
            <FormControlLabel className="checkBox"
                control={
                    <Checkbox
                        checked={checkBoxChecked}
                        onChange={handleChangeCheckBox}
                        name={item}
                        color="primary"
                    />
                }
                label={item}
            />
            </div>
        )
    }

}

export default SliderWithLabelDummy;
