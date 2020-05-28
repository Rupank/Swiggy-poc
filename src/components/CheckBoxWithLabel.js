import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import '../pages/homepage.css';
function CheckBoxWithLabel({ label, handleClicked }) {
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (handleClicked) {
            handleClicked(event.target.checked);
        }
    };
    return (
        <div className="checkBoxContainer" key={label}>
            <Checkbox
                checked={checked}
                onChange={handleChange}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <span>{label}</span>
        </div>
    )
}

export default CheckBoxWithLabel
