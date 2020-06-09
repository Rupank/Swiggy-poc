import React, { useState, useEffect,memo } from 'react'
import Button from '@material-ui/core/Button';
import SliderWithLabelDummy from './SliderWithLabelDummy';
import * as _ from "lodash";
function ListByCatFilter(props) {
    const { list } = props;
    const [catList, setcatList] = useState({});
    const [currentCat, setCurrentCat] = useState(1);
    const [showMore, setShowMore] = useState(true);


    useEffect(() => {
        let keys = _.keys(list);
        let catObj = {};
        for (let key of keys) {
            let innerArr = _.values(list[key]);
            let innerKeys = _.keys(innerArr);
            if (innerKeys.length > 0) {
                for (let innerKey of innerKeys) {
                    let obj = parseInt(innerArr[innerKey][0]['App Category\n (show more)'], 10);
                    if (obj) {
                        let newObj = {};
                        if (!catObj[obj]) {
                            catObj[obj] = [];
                        }
                        catObj[obj].push(key);
                        break;
                    }
                }
            }
        }
        setcatList({ ...catObj });
    }, [])


    useEffect(() => {
        if (_.keys(catList).length > 0) {
            if (!catList[currentCat + 1]) {
                setShowMore(false);
            }
            if (!catList[currentCat]) {
                setCurrentCat(currentCat + 1);
            }
        }
    }, [catList, currentCat])

    const handleChange = () => {
        let nextCatList = catList[currentCat + 1];
        if (nextCatList && nextCatList.length > 0) {
            setCurrentCat(currentCat + 1);
        }
        else {
            setShowMore(false);
        }
    }

    const isExistInCatList = (item) => {
        let currCatCond = (catList[currentCat] && catList[currentCat].indexOf(item) !== -1) ? true : false;
        let prevCatCond = ((catList[currentCat - 1] && catList[currentCat - 1].indexOf(item) !== -1) || currCatCond) ? true : false;
        let secondLastCatCond = ((catList[currentCat - 2] && catList[currentCat - 2].indexOf(item) !== -1) || prevCatCond) ? true : false;
        if (currentCat === 1) {
            if (currCatCond) {
                return true;
            }
            return false;
        }
        else if (currentCat === 2) {
            if (prevCatCond) {
                return true;
            }
            return false;

        } else if (currentCat === 3) {
            if (secondLastCatCond) {
                return true;
            }
            return false;
        }
        return true;
    }

    if (_.keys(catList).length > 0) {
        return (<div className="innerStepsParent">
            {_.keys(list).map((item) => (
                isExistInCatList(item) &&
                <SliderWithLabelDummy
                    key={`${item}`}
                    item={item}
                    children={_.keys(list[item])}
                    childrenValues={_.values(list[item])}
                />
            ))}
            {showMore &&
                <div className="stepTileFullWidth">
                    <Button className='innerStepsParent' variant="contained" onClick={handleChange}>
                        Load More
                     </Button>
                </div>
            }
        </div>)

    }
    return null;
}

export default memo(ListByCatFilter)
