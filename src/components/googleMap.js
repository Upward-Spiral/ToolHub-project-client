import React from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';


export const InitialMap = withGoogleMap(props=>{
    return(
        <GoogleMap

            defaultZoom={10} 
            defaultCenter={props.userLocation}
            // onClick={props.onMapClick}
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




// onClick={()=> props.onMarkerClick(marker)}

                    // {...marker.showInfo && (
                    //     <InfoWindow onCloseClick={()=>props.onMarkerClose(marker)}>
                    //         {
                    //             marker.imageUrl 
                    //             ?  <div id="infowindow"><img src={marker.imageUrl}/></div> 
                    //             :  <div id="infowindow">image</div>

                    //         }
                    //     </InfoWindow>
                    // )}