import React, { useState, useEffect, memo } from 'react'
import Switch from '@material-ui/core/Switch';
import InnerList from '../pages/InnerList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getError, getPending, getFilteredData, getRootFilter, getAllData, getInnerFilters } from '../reducers/productReducer';
import { filterInnerData } from '../actions/productActions';
import Button from '@material-ui/core/Button';
import * as _ from 'lodash';

function ToggleWithLabelParent(props) {
    const { item, filterInnerData, rootFilter, data, innerFilters } = props;
    const [checked, setChecked] = useState(false);
    const [showToggleBtn, setToggleBtnVisibility] = useState(true);
    useEffect(() => {
        if (innerFilters[`${rootFilter}_${item}`]) {
            return;
        }
        filterInnerData(rootFilter, data[rootFilter], item)
        // fetch the data to display
    }, [])

    useEffect(() => {
        const filter = innerFilters[`${rootFilter}_${item}`];
        if (filter && filter[0] && _.keys(filter[0]).length > 0) {
            if (_.values(filter[1]).length === 0) {
                setToggleBtnVisibility(true);
            } else {
                setToggleBtnVisibility(false);
            }
        }
    })

    const handleChange = (event) => {
        setChecked(!checked);
        // handleClick(!checked);
    };
    return (
        <div className="stepTile">
            <Button className='stepTileBtn' variant="contained" onClick={handleChange}>
                <div>
                    <div className="sliderLable">
                        {item}
                    </div>
                    {showToggleBtn && <Switch className="slider"
                        checked={checked}
                        // onChange={handleChange}
                        color="primary"
                        name="checked"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />}
                </div>
            </Button>
            {(!showToggleBtn || checked) && <InnerList filters={innerFilters[`${rootFilter}_${item}`]} />}
        </div>
    )
}
const mapStateToProps = (state) => ({
    data: getAllData(state),
    filtererdData: getFilteredData(state),
    rootFilter: getRootFilter(state),
    error: getError(state),
    isLoading: getPending(state),
    innerFilters: getInnerFilters(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    filterInnerData: filterInnerData
}, dispatch)
export default memo(connect(mapStateToProps, mapDispatchToProps)(ToggleWithLabelParent));
