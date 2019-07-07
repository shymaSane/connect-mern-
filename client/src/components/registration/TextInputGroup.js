import React from 'react'
import PropTypes from 'prop-types';

TextInputGroup = (props) => {
    const{label, type, name, placeholder, value, onChange} = props
    return (
        
        <div>
            <label>
                {label}
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    )
}

TextInputGroup.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TextInputGroup