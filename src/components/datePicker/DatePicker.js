import React from 'react';
import {Box, Button, FormGroup, Modal, TextField} from '@mui/material';

const DatePicker = ({
                        dateRange,
                        setDateRange,
                        open,
                        handleClose,
                        setSearchVideosFromDateRange
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
        mt: '8px'
    };

    const filterButtonStyle = {
        backgroundColor: '#86ac41',
        width: '48%',
        marginTop: '8px',
        mr: '2%',
        '&:hover': {
            backgroundColor: '#86ac41',
            boxShadow: 'inset 0 0 0.5em white'
        }
    };

    const cancelButtonStyle = {
        backgroundColor: '#34675c',
        width: '50%',
        marginTop: '8px',
        '&:hover': {
            backgroundColor: '#34675c',
            boxShadow: 'inset 0 0 0.5em white'
        }
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
                    <Button
                        sx={filterButtonStyle}
                        onClick={() => {
                            setSearchVideosFromDateRange(true);
                            handleClose()
                        }}
                        color='info'
                        variant='contained'>
                        Filter</Button>
                    <Button
                        sx={cancelButtonStyle}
                        onClick={() => {
                            setSearchVideosFromDateRange(false);
                            handleClose();
                        }}
                        color='error'
                        variant='contained'
                    >
                        Cancel
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}
export default DatePicker;