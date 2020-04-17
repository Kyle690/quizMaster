import React from 'react';
import Spinner from "react-spinner-material/lib";

export const Loading =({show})=>{

    if(show){
        return (
            <div style={Styles.loadingDiv}>
                <Spinner
                    size={120}
                    spinnercolor={'white'}
                    spinnerwidth={5}
                    visible={show}/>
            </div>
        )
    }else{
        return null;
    }

};


const Styles={
    loadingDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        zIndex: 10000,
        height: '100%',
        width: '100%',
        overflow: 'show',
        margin: 'auto',
        top: 0,
        left:0,
        bottom:0,
        right:0,
        backgroundColor:"rgba(0,0,0,0.6)"
    }
};