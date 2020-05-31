import React, { useState } from 'react'
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

function ToggleButton(props) {
    const { item } = props;
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(!checked);
    };
    return (
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
    )
}

export default ToggleButton
