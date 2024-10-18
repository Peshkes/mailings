import React from 'react';

export type Option = {
    value: string | number;
    label: string;
    isDisabled?: boolean;
}

type FormSelectFieldProps = {
    id: string;
    label: string;
    value: string | number | undefined ;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    startOption?: Option;
    disabled?: boolean;
    required?: boolean;
}

const FormSelectField = ({id, label, value, onChange, options, startOption, disabled = false, required = false}: FormSelectFieldProps) => (
    <div className="grid grid-cols-3 gap-4 items-center mb-4">
        <label htmlFor={id} className="text-cyan-800 font-semibold col-span-1">
            {label}
        </label>
        <select
            id={id}
            value={value}
            onChange={onChange}
            className="col-span-2 w-full border border-cyan-800/40 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
            disabled={disabled}
            required={required}
        >
            {startOption ? (
                <option value={startOption.value}>{startOption.label}</option>
            ) : (
                <option value="" disabled={required && !value}>
                    Выбери вариант
                </option>
            )}
            {options.map(option => (
                <option key={option.value} value={option.value} disabled={option.isDisabled}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default FormSelectField;
