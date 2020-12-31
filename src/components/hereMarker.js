import React from 'react'
import { Image } from 'react-bootstrap'

export default function HereMarker(props) {
  const markerRef = React.useRef(null)
  return (
    <div className="here-marker" ref={markerRef}>
      <Image src={props.imgUrl} fluid roundedCircle />
    </div>
  )
}
