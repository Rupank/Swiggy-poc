import React, { useEffect, memo } from 'react'
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { bindActionCreators } from 'redux';
import { getError, getPending, getFilteredData, getAllData } from '../reducers/productReducer';
import { applyRootFilter } from '../actions/productActions';
import ToggleWithLabelParent from '../components/ToggleWithLabelParent';
function Node1List(props) {
    const { data, filtererdData, applyRootFilter } = props;
    useEffect(() => {
        if (filtererdData.length === 0 && _.keys(data).length > 0) {
            let route = props.match.params.id;
            let parsedRoute = `${route.substring(0, route.length - 1)} ${route[route.length - 1]}`
            applyRootFilter(parsedRoute, data);
        }
    }, [filtererdData, data, props.match.params.id])

    return (
        <div className="stepsParent">
            {filtererdData && filtererdData.length > 0 && filtererdData.map((item) => (
                <ToggleWithLabelParent key={item} item={item} />
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
export default memo(connect(mapStateToProps, mapDispatchToProps)(Node1List))
