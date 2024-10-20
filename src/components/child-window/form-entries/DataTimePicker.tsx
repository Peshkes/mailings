import React, {Dispatch, SetStateAction, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css';


type DateTimePickerProps = {
    checkDate: Date | null;
    setCheckDate: Dispatch<SetStateAction<Date | null>>;
    defaultHours?: number;
}

const DateTimePicker = ({ checkDate, setCheckDate, defaultHours }: DateTimePickerProps) => {

    useEffect(() => {
        if (!checkDate) {
            const defaultDate = new Date();
            defaultHours && defaultDate.setHours(defaultHours, 0, 0, 0);
            setCheckDate(defaultDate);
        }
    }, [checkDate, setCheckDate]);

    return (
        <DatePicker
            required={true}
            selected={checkDate}
            onChange={(date) => date && setCheckDate(date)}
            showTimeSelect
            timeIntervals={60}
            timeCaption="Время"
            dateFormat="Pp"
            locale={ru}
            timeFormat="HH:mm"
            calendarStartDay={1}
            className={`flex-1 border border-cyan-800/40 rounded-md focus:ring-2 focus:ring-cyan-800 focus:border-cyan-500 transition duration-200`}
            calendarClassName="bg-white border border-cyan-800 rounded-lg"
            dayClassName={() => 'rounded-md hover:bg-cyan-100 transition duration-200'}
            popperClassName="z-10"
            onKeyDown={(e) => e.preventDefault()}
        />
    );
};

export default DateTimePicker;