import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { bindActionCreators } from 'redux';
import { getError, getPending, getFilteredData, getAllData } from '../reducers/productReducer';
import { applyRootFilter } from '../actions/productActions';
import SliderWithLabel from '../components/SliderWithLabel';
function Content(props) {
    const { data, filtererdData, error, isLoading, applyRootFilter } = props;
    useEffect(() => {
        if (filtererdData.length === 0 && _.keys(data).length > 0) {
            let route = props.match.params.id;
            let parsedRoute = `${route.substring(0,route.length -1)} ${route[route.length-1]}`
            applyRootFilter(parsedRoute, data);
        }
    })
    const handleClick = (val, item) => {
    }
    return (
        <div className="stepsParent">
            {filtererdData && filtererdData.length > 0 && filtererdData.map((item) => (
                <SliderWithLabel key={item} item={item} handleClick={(val) => handleClick(val, item)} />
            ))}
        </div>
    )
}
const mapStateToProps = (state) => ({
    data: getAllData(state),
    filtererdData: getFilteredData(state),
    error: getError(state),
    isLoading: getPending(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    applyRootFilter: applyRootFilter
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Content)
