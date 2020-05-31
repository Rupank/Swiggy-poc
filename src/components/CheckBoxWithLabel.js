import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
function CheckBoxWithLabel({ label, handleClicked }) {
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        let newChecKValue = !checked;
        setChecked(newChecKValue);
        if (handleClicked) {
            handleClicked(newChecKValue);
        }
    };
    return (
        <div className="checkBoxContainer" key={label} onClick = {handleChange}>
            <Checkbox
                checked={checked}
                // onChange={handleChange}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <div className="checkBoxLabel">{label}</div>
        </div>
    )
}

export default CheckBoxWithLabel
