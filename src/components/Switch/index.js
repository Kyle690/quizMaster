import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export const MainSwitch=(props)=>{

    return (
        <FormControlLabel
            control={
                <Switch
                    checked={props.checked}
                    onChange={props.onChange}
                    value={props.value}
                    color="primary"
                />
            }
            label={props.label}
        />
    )

};