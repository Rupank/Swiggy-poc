import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllData, getError, getPending } from '../reducers/productReducer';
import { parseData } from '../actions/productActions';
function DataLoader(props) {
    const { parseData, data } = props;
    useEffect(() => {
        if (data.length === 0) {
            parseData();
        }
    }, [])
    return (
        <div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    data: getAllData(state),
    error: getError(state),
    isLoading: getPending(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    parseData: parseData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DataLoader)
