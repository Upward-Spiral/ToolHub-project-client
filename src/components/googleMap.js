import React from 'react';
import {GoogleMap, withScriptjs ,withGoogleMap, Marker/* , InfoWindow */} from 'react-google-maps';


export const WrappedMap = withScriptjs( withGoogleMap((props)=>{
    return(
        <GoogleMap

            defaultZoom={10} 
            center = {props.center}
            
            >

            {props.markers.map((marker,index)=>(
                <Marker 
                    key={index}
                    position={marker.position}

                />
            ))}
        </GoogleMap>
    )   
})
)



