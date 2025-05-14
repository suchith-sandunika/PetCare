import React from "react";
import { Search } from "lucide-react";
import '../styles/styles.css';

const Searchbar = ({ placeholder, onChange, inputStyles, iconClass, iconStyles }) => {
    return (
        <div className='d-flex align-items-end search-bar-size'>
            <input
                type="text"
                className='form-control custom-input'
                placeholder={placeholder}
                onChange={onChange}
                style={inputStyles}
            />
            <Search className={iconClass} style={iconStyles}/>
        </div>
    )
}

export default Searchbar;