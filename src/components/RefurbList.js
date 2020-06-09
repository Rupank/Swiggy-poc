import React, { useState, useEffect,memo } from 'react'
import * as _ from 'lodash';
import MaterialTable from 'material-table'
import DeleteIcon from '@material-ui/icons/Delete';

function RefurbList(props) {
    const { suggestedRefurbs, removeRefurb } = props;
    const price = 5000;
    const tableColLabels = ['Suggested ', 'Price'];
    const rowKeys = ['refurb', 'price'];

    const getColumnData = () => {
        return tableColLabels.map((colLabel, index) => {
            return { title: colLabel, field: rowKeys[index] }
        })
    }



    const getActions = () => {
        return [{
            icon: () => <DeleteIcon color='primary' />,
            // tooltip: 'Delete Suggested Refurb',
            onClick: (event, rowData) => {
                removeRefurb(rowData.refurb)
            }
        }];
    }

    const getRowData = () => {

        return suggestedRefurbs.map(item => {
            let obj = {};
            for (let i = 0; i < rowKeys.length; i++) {
                if (i == 0) {
                    obj[rowKeys[i]] = item;
                }
                if (i == 1) {
                    obj[rowKeys[i]] = price;
                }
            }
            return obj;
        })
    }

    const [data, setData] = useState([]);
    useEffect(() => {
        setData(getRowData());
    }, [suggestedRefurbs])
    if (suggestedRefurbs.length > 0) {
        const columns = getColumnData();
        const actions = getActions();
        return (
            <div className="checkBoxContainer">
                <div className="refurbParent">
                    <MaterialTable
                        style={{ width: '100%' }}
                        title="Suggested Refurbs"
                        columns={columns}
                        data={data}
                        actions={actions}
                        options={
                            {
                                search: false,
                                paging: false,
                                columnsButton: false,
                                header: false
                            }
                        }
                    />
                </div>
            </div>
        )
    }
    return null;
}

export default memo(RefurbList)
