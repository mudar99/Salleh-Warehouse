import React, { useEffect, useState } from 'react';
import { isArabic, isEnglish } from './langType';
import { InputText } from 'primereact/inputtext';

const LanguageInput = ({ placeholder, onChange, type, defaultValue }) => {
    const [className, setClassName] = useState()
    useEffect(() => {
        if (defaultValue) {
            if (isArabic(defaultValue)) {
                console.log(defaultValue, "Arabic")
                setClassName('arabic');
            } else if (isEnglish(defaultValue)) {
                console.log(defaultValue, "English")
                setClassName('english');
            }
        }
    }, [defaultValue]);

    const handleChange = (e) => {
        const inputText = e.target.value;

        if (isArabic(inputText)) {
            setClassName('arabic');
        } else if (isEnglish(inputText)) {
            setClassName('english');
        }
        onChange(inputText);
    };

    return (
        <InputText
            defaultValue={defaultValue}
            className={className}
            type={type}
            placeholder={placeholder}
            style={{ width: "100%" }}
            onChange={handleChange}
        />
    );
};

export default LanguageInput;
