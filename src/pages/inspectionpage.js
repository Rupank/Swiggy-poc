import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function Inspectionpage() {

    const data = ['KYC', 'Report', 'Dent Map', 'Tyre', 'Photos', 'Checklist'];
    return (
        <div className="stepsParent">
            {data.map((item, index) => (
                <div className="stepTile" key={index}>
                    {(item === 'Report') &&
                        <Link to={{
                            pathname: `/homepage`
                        }}>
                            <Button className='stepTileBtn'color="primary" variant="contained" > {item}</Button>
                        </Link>
                    }
                    {item !== 'Report' &&
                        <Button className='stepTileBtn' color="default" variant="contained" > {item}</Button>
                    }
                </div>
            ))}
        </div>
    )
}

export default Inspectionpage
