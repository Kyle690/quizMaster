import React from "react";
import {InputLabel,FormControl, makeStyles} from "@material-ui/core";
import Datetime from "react-datetime";

import 'react-datetime/css/react-datetime.css';
const styles = {
    label: {
        cursor: "pointer",
        paddingLeft: "0",
        color: "rgba(0, 0, 0, 0.26)",
        fontSize: "14px",
        lineHeight: "1.428571429",
        fontWeight: "400",
        display: "inline-flex"
    },
};

const useStyles = makeStyles(styles);

const DateTimePicker=({value, onChange})=>{
    const classes = useStyles();
  return (
      <div>
          <InputLabel className={classes.label}>
              Date
          </InputLabel>
          <br />
          <FormControl fullWidth>
              <Datetime
                  onChange={onChange}
                  inputProps={{
                      placeholder: "Quiz state date",
                      //onChange:onChange,
                      //value:value
                  }}
                  value={value}
              />
          </FormControl>
      </div>
  )
};
export default DateTimePicker;