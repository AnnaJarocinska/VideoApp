import React, {useState} from 'react';
import {TextField} from "@mui/material";

const DatePicker = () => {
    const [dateRange, setDateRange] = useState({
        dateFrom: "",
        dateTo: ""
    });

    return (
        <>
            <form noValidate>
                <TextField
                    id="date"
                    label="Date from"
                    type="date"
                    value={dateRange.dateFrom}
                    onChange={(e) => setDateRange({...dateRange, dateFrom: e.target.value})}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="date"
                    label="Date to"
                    type="date"
                    value={dateRange.dateTo}
                    onChange={(e) => setDateRange({...dateRange, dateTo: e.target.value})}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        </>
    );
}
export default DatePicker;