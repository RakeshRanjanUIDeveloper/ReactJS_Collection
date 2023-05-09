import React, { Fragment } from 'react';
import "./Dropdown.scss";

const Dropdown = (props) => {
    const { id, data, placeholder, onChange, name, ...inputProps } = props;
    return (
        <Fragment>
            <select name={name} id={id} placeholder={placeholder} onChange={onChange} defaultValue={"default"}>
                <option name={name} value={"default"} hidden  disable>{placeholder}</option>
                {data.map((op, value) => 
                    <option name={name} value={op} key={value}>{op}</option>
                )}
            </select>
        </Fragment>
    )
}

export default Dropdown