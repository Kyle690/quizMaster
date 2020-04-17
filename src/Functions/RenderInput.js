import React from "react";
import CustomInput from "../components/CustomInput/CustomInput";

export const RenderInput=({input, label,type,placeholder,name,meta,width,multiLine})=>{
  let errorStatus;
  meta.touched && meta.error?errorStatus=true:errorStatus=false;

  return (
      <CustomInput
        inputProps={{
            ...input,
            type:type,
            placeholder,
            multiline:multiLine!==undefined?multiLine:false
        }}
        labelText={label}
        id={name}
        formControlProps={{
            fullWidth:width!==undefined?width:true
        }}
        error={errorStatus}
      />
  )
};