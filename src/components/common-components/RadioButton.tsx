import React from 'react';

type Props = {
    value: string
    onChange: () => void
    checked: boolean
    name: string
}

const RadioButton = ({value, onChange, checked, name}: Props) => {
    return (
        <div className="pt-1">
            <label className="relative cursor-pointer flex items-center">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    className="appearance-none peer h-4 w-4 cursor-pointer bg-white border-2 border-solid border-cyan-800/20  transition-all mr-7"
                    onChange={onChange}
                    checked={checked}/>
                <span
                    className="absolute bg-cyan-800 w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity left-[2px] top-[6px] duration-200"/>
                {value}
            </label>
        </div>
    );
};

export default RadioButton;
