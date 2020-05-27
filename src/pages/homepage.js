import * as _ from "lodash";
import { Link } from 'react-router-dom';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllData, getError, getPending } from '../reducers/productReducer';
import { parseData, applyRootFilter } from '../actions/productActions';
import Button from '@material-ui/core/Button';
import './homepage.css';
class HomePage extends Component {

    constructor(props) {
        super(props)
        this.shouldComponentRender = this.shouldComponentRender.bind(this);
    }

    componentDidMount() {
        const { parseData, data } = this.props;
        if (data.length !== 0) {
            return;
        }
        parseData();
    }



    render() {
        const { data, error, applyRootFilter } = this.props;

        const handleClick = (index) => {
            applyRootFilter(index);
        }

        if (!this.shouldComponentRender()) return (
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
                    <div className='stepTile' key={keys[index]} onClick={(e) => handleClick(keys[index])}>
                        <Link to={{
                            pathname: `/steps/`
                        }}>

                            <Button className='stepTileBtn' variant="contained"> {keys[index]}</Button>

                        </Link>
                    </div>

                ))}
            </div>
        )
    }

    shouldComponentRender() {
        const { isLoading } = this.props;
        if (isLoading) {
            return false;
        } else {
            return true;
        }
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);


