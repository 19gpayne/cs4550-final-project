import React, { useState } from 'react';

export default function NumberInput({ label, value, setValue, min, max, step }) {
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const input = e.target.value;
        if (e.key === "." || e.key === "," || e.key === "-") {
            setValue(input.slice(0, -1));
            setError('Please enter a whole number between 1 and 5');
            return;
        }
        if (input === '' || input === undefined) {
            setValue('');
            setError('');
            return;
        }
        if (/^\d+$/.test(input) && parseFloat(input) >= 1 && parseFloat(input) <= 5) {
            setValue(input);
        } else {
            setError('Please enter a number between 1 and 5');
        }
    };

    return (
        <div className="mb-3">
            <label htmlFor="numberInput" className="form-label">{label}</label>
            <input type="number" className="form-control" id="numberInput" value={value} onChange={e => handleInputChange(e)} min={min} max={max} step={step} />
            {error && <div className="alert alert-danger mt-2 p-2">{error}</div>}
        </div>
    )
}