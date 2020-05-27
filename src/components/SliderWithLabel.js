import React, { useState, useEffect } from 'react'
import Switch from '@material-ui/core/Switch';
import InnerContent from '../pages/InnerContent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getError, getPending, getFilteredData, getRootFilter, getAllData, getInnerFilters } from '../reducers/productReducer';
import { filterInnerData } from '../actions/productActions';
import Button from '@material-ui/core/Button';
import '../pages/homepage.css';

function SliderWithLabel(props) {
    const { item, handleClick, filterInnerData, rootFilter, data, innerFilters } = props;
    const [checked, setChecked] = useState(false);
    const [content, setContent] = useState(null);

    // useEffect(() => {
    //     filterInnerData(rootFilter, data[rootFilter], item)
    // }, [])

    useEffect(() => {
        if (innerFilters[`${rootFilter}_${item}`]) {
            return;
        }
        filterInnerData(rootFilter, data[rootFilter], item)
        // fetch the data to display
    }, [checked])

    const handleChange = (event) => {
        setChecked(!checked);
        handleClick(!checked);
    };
    return (
        <div className="stepTile">
            <Button className='stepTileBtn' variant="contained">
                <div>
                    <div className="sliderLable">
                        {item}
                    </div>
                    <Switch className="slider"
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                        name="checked"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
            </Button>
            {checked && <InnerContent filters={innerFilters[`${rootFilter}_${item}`]} />}
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
export default connect(mapStateToProps, mapDispatchToProps)(SliderWithLabel);
