import React from 'react';
import {Box, Checkbox, FormControlLabel, FormGroup, Modal, TextField} from '@mui/material';

const DatePicker = ({
                        dateRange,
                        setDateRange,
                        open,
                        handleClose,
                        setSearchVideosFromDateRange,
                        searchVideosFromDateRange,
                    }) => {

    const boxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#7da3a1',
        borderRadius: '10px',
        border: '1px solid #fff',
        p: 4
    };

    const formStyle = {
        display: 'flex',
        width: '100%',
        alignItems: 'space-around',
        justifyContent: 'center',
    };

    const itemStyle = {
        marginTop: '8px'
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            BackdropProps={{style: {backgroundColor: 'rgba(0,0,0,0.5)'}}}
        >
            <Box sx={boxStyle}>
                <form noValidate>
                    <FormGroup sx={formStyle}>
                        <TextField
                            sx={itemStyle}
                            id='date'
                            label='Date from'
                            type='date'
                            value={dateRange.dateFrom}
                            onChange={(e) => setDateRange({...dateRange, dateFrom: e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            sx={itemStyle}
                            id='date'
                            label='Date to'
                            type='date'
                            value={dateRange.dateTo}
                            onChange={(e) => setDateRange({...dateRange, dateTo: e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox
                            onChange={() => {
                                setSearchVideosFromDateRange(!searchVideosFromDateRange);
                                handleClose();
                            }}
                            checked={searchVideosFromDateRange}
                            {...!searchVideosFromDateRange ? 'enable filtering' : 'disable filtering'}
                        />}
                                          label={'filter'}/>
                    </FormGroup>
                </form>
            </Box>
        </Modal>
    );
}
export default DatePicker;