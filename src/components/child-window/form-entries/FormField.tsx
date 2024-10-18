import React from 'react';

type FormFieldProps = {
    id: string;
    label: string;
    type: string;
    value: string | number | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    required?: boolean;
    readonly?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

const FormField = ({id, label, type, value, onChange, children, disabled = false, required = false, readonly = false, onPaste, onKeyDown}: FormFieldProps) => (
    <div className="grid grid-cols-3 gap-4 mb-4 items-center">
        <label htmlFor={id} className="text-cyan-800 font-semibold col-span-1">
            {label}
        </label>
        <div className={`flex items-center col-span-2 ${children ? 'space-x-2' : ''}`}>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className={`flex-grow border border-cyan-800/40 rounded-md focus:ring-cyan-500 focus:border-cyan-500`}
                disabled={disabled}
                required={required}
                readOnly={readonly}
                onPaste={onPaste}
                onKeyDown={onKeyDown}
            />
            {children && (
                <div className="min-w-[80px] flex items-center">
                    {children}
                </div>
            )}
        </div>
    </div>
);

export default FormField;
