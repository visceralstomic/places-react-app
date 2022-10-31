import React from "react";
import cl from "./mySelect.module.css";



const MySelect = ({options, defaultValue, onChange, value}) => {
    return <select
                value={value}
                onChange={e => onChange(e.target.value)}
            >
                <option disabled value="">{defaultValue}</option>
                {options.map(option => <option 
                                            key={option.value} value={option.value}
                                        >{option.name}</option>)}
            </select>
}


export default MySelect;