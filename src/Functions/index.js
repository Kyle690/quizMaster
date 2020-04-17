import React from "react";
import Slide from "@material-ui/core/Slide";

export const Transition = React.forwardRef((function Transition(props,ref){
    return <Slide direction={'down'} ref={ref} {...props}/>
}));

export const FormatDate=(date)=>{
    const d =new Date(date);
    const day = d.getDate();
    const month=d.getMonth()+1;
    const year=d.getFullYear();
    const time = d.getHours()+':'+('0'+d.getMinutes()).slice(-2);

    return day+'/'+month+'/'+year+' '+time
};