import React, { Fragment } from 'react';


const DropdownCustom = (props) => {

    const { id, data, ...inputProps } = props;
    return (
        <Fragment>
            <div className='dropdown-block' id={id}>
                {data.map((op) => 
                    <option>{op}</option>
                )}
            </div>
        </Fragment>
    )
}

export default DropdownCustom