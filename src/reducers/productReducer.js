import { PARSE_DATA_SUCCESSFUL, PARSE_DATA_REQUESTED, PARSE_DATA_FAILED, FILTER_DATA_SUCCEDED, FILTER_INNER_DATA_SUCCEDED, ROOT_FILTER_APPLIED } from '../actions/types';

const initialState = {
    data: [],
    filteredData: [],
    isLoading: true,
    filters: {},
    dummy:{},
    rootFilter: '',
    error: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PARSE_DATA_REQUESTED:
            return {...state, isLoading: true }
        case PARSE_DATA_FAILED:
            return { error: action.payload.error.message, isLoading: false }
        case PARSE_DATA_SUCCESSFUL:
            return { ...state, data: action.payload.data, isLoading: false, error: '' }
        case FILTER_DATA_SUCCEDED:
            return { ...state, filteredData: action.payload.filteredData }
        case ROOT_FILTER_APPLIED:
            return { ...state, rootFilter: action.payload.rootFilter }
        case FILTER_INNER_DATA_SUCCEDED:
            let obj = {};
            obj[action.payload.key] = action.payload.value;
            return { ...state,filters: Object.assign(state.filters, obj) }
        default:
            return state;
    }
}

export const getAllData = state => state.data;
export const getFilteredData = state => state.filteredData;
export const getError = state => state.error;
export const getPending = state => state.isLoading;
export const getRootFilter = state => state.rootFilter;
export const getInnerFilters = state => state.filters;
