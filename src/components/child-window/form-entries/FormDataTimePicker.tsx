import React, {Dispatch, SetStateAction} from 'react';
import DataTimePicker from "./DataTimePicker";

type FormFieldProps = {
    label: string;
    value: Date | null;
    onChange: Dispatch<SetStateAction<Date | null>>;
    defaultHours: number;
    children?: React.ReactNode;
}

const FormDataTimePicker = ({label, value, onChange, defaultHours, children}: FormFieldProps) => (
    <div className="grid grid-cols-3 gap-4 mb-4 items-center">
        <label className="text-cyan-800 font-semibold col-span-1">
            {label}
        </label>
        <div className={`flex items-center col-span-2 ${children ? 'space-x-2' : ''}`}>
            <DataTimePicker checkDate={value} setCheckDate={onChange} defaultHours={defaultHours}/>
            {children && (
                <div className="min-w-[80px] flex items-center">
                    {children}
                </div>
            )}
        </div>
    </div>
);

export default  FormDataTimePicker;
