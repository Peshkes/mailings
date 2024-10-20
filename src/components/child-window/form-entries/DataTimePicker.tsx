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
            // defaultHours && defaultDate.setHours(defaultHours, 0, 0, 0);
            setCheckDate(defaultDate);
        }
    }, [checkDate, setCheckDate]);

    return (
        <DatePicker
            required={true}
            selected={checkDate}
            onChange={(date) => date && setCheckDate(date)}
            showTimeSelect
            timeIntervals={defaultHours?60:1}
            timeCaption="Время"
            dateFormat="Pp"
            locale={ru}
            timeFormat="HH:mm"
            calendarStartDay={1}
            className={`w-full pl-1 border border-cyan-800/40 rounded-md`}
            calendarClassName="bg-white border border-cyan-800 rounded-lg"
            dayClassName={() => 'rounded-md hover:bg-cyan-100 transition duration-200'}
            popperClassName="z-10"
            onKeyDown={(e) => e.preventDefault()}
        />
    );
};

export default DateTimePicker;