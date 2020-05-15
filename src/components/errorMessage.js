import React from 'react';

function ErrorMessage(props) {
    // debugger
    if (props.errorsArray.length === 0) { return (<div></div>)}
    else {
        var errorList = []
        errorList = props.errorsArray.map((err,index)=>{
            return (
                <li key={index}>{err}</li>
            )
        })

        
        return (<ul style={{color:"red"}}>{errorList}</ul>)
    }
    
}

export default ErrorMessage;
