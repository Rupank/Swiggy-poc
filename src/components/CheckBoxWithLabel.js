import React,{useState} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
function CheckBoxWithLabel({key,label}) {
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
        // setChecked(!checked);
      };
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name={key}
                    color="primary"
                />
            }
            label={label}
        />
    )
}

export default CheckBoxWithLabel
