import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getError, getPending, getFilteredData, getRootFilter, getAllData } from '../reducers/productReducer';
import { filterData } from '../actions/productActions';
import SliderWithLabel from '../components/SliderWithLabel';
import './homepage.css'
function Content(props) {
    const { filterData, data, filtererdData, rootFilter, error, isLoading } = props;
    useEffect(() => {
        // if (filtererdData.length === 0) {
        filterData(rootFilter, data);
        // }
    }, [])
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
    rootFilter: getRootFilter(state),
    error: getError(state),
    isLoading: getPending(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    filterData: filterData
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Content)
