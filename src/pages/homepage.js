import * as _ from "lodash";
import { Link } from 'react-router-dom';
import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllData, getError, getPending } from '../reducers/productReducer';
import { parseData, applyRootFilter } from '../actions/productActions';
import Button from '@material-ui/core/Button';
import ToggleButton from '../components/ToggleButton';

function HomePage(props) {
    const { data, error, applyRootFilter, isLoading } = props;
    const [buttonStatus, setButtonVisibility] = useState({
        'Step 1': true,
        'Step 2': false,
        'Step 3': true,
        'Step 4': false,
        'Step 5': false
    })

    const [radioChecked, setRadioCheck] = useState({
        'Step 2 Check': false,
        'Step 4 Check': false
    });

    const checkButtonLabels = {
        'Step 2': 'Battery',
        'Step 4': 'Test Drive'
    }

    useEffect(() => {
        const keys = _.keys(radioChecked);
        let obj = {};
        for (let key of keys) {
            if (key === 'Step 2 Check') {
                obj['Step 2'] = radioChecked[key]

            }
            else if (key === 'Step 4 Check') {
                // if (radioChecked[key]) {
                obj['Step 4'] = radioChecked[key];
                obj['Step 5'] = radioChecked[key];
                // }
            }
        }
        setButtonVisibility({ ...buttonStatus, ...Object.assign(buttonStatus, obj) });
    }, [radioChecked])

    const handleClick = (index) => {
        applyRootFilter(index, data);
    }

    const shouldDisplayToggle = (index) => {
        if (index === 'Step 2' || index === 'Step 4') {
            return true;
        }
        return false;
    }

    const handleClickToggle = (index) => {
        let toggleKey = null;
        if (index === 'Step 2') {
            toggleKey = 'Step 2 Check';
        }

        else if (index === 'Step 4') {
            toggleKey = 'Step 4 Check';
        }

        if (toggleKey !== null) {
            let obj = {};
            obj[toggleKey] = !radioChecked[toggleKey];
            setRadioCheck({ ...radioChecked, ...Object.assign(radioChecked, obj) })
        }
    }

    const shouldComponentRender = () => {
        if (isLoading) {
            return false;
        } else {
            return true;
        }
    }

    if (!shouldComponentRender()) return (
        <div>Loading...</div>
    )
    if (error) return (
        <div>
            {error}
        </div>
    )
    const keys = _.keys(data);
    return (
        <div className="stepsParent">
            {_.values(data).map((item, index) => (
                <div className="stepsContainer" key={index}>
                    {shouldDisplayToggle(keys[index]) &&
                        <div key={`${keys[index]}_radio`} className="customCheckSteps" onClick={(e) => handleClickToggle(keys[index])}>
                            <ToggleButton item={checkButtonLabels[keys[index]]} />
                        </div>}

                    {buttonStatus[keys[index]] && <div className='stepTile' key={keys[index]} onClick={(e) => handleClick(keys[index])}>

                        <Link to={{
                            pathname: `/${keys[index].replace(" ", "")}`
                        }}>
                            <Button className='stepTileBtn' variant="contained" > {keys[index]}</Button>
                        </Link>
                    </div>}
                    {!buttonStatus[keys[index]] && <div className='stepTile' key={keys[index]}>

                        <Button className='stepTileBtn' variant="contained" disabled> {keys[index]}</Button>
                    </div>}
                </div>

            ))
            }
        </div >
    )
}


const mapStateToProps = (state) => ({
    data: getAllData(state),
    error: getError(state),
    isLoading: getPending(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    parseData: parseData,
    applyRootFilter: applyRootFilter
}, dispatch)

export default memo(connect(mapStateToProps, mapDispatchToProps)(HomePage));


