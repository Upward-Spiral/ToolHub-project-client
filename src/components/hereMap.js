// src/DisplayMapFC.js

import * as React from 'react'
import HereMarker from './hereMarker'
import ReactDOMServer from 'react-dom/server'

export const DisplayMapFC = (props) => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null)

  React.useEffect(() => {

    if (!mapRef.current) return
    debugger
    const H = window.H
    const platform = new H.service.Platform({
      apikey: "ye82UA_yMUERzy8lb5eY8kae8qAgsbtkiJaarBD5eoI"
    })
    const defaultLayers = platform.createDefaultLayers()
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: props.centerPoint.lat, lng: props.centerPoint.lng },
      zoom: 7,
      pixelRatio: window.devicePixelRatio || 1
    })

    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => hMap.getViewPort().resize())

    function addDomMarker(map, imgUrl, coords) {

      const markerString = ReactDOMServer.renderToString(<HereMarker imgUrl={imgUrl} />)
      //create dom icon and add/remove opacity listeners
      var domIcon = new H.map.DomIcon(markerString)
      var userMarker = new H.map.DomMarker({ lat: coords.lat, lng: coords.lng }, {
        icon: domIcon
      })
      map.addObject(userMarker)
    }

    addDomMarker(hMap, props.userImg, props.centerPoint)

    if (props.markers.length > 0) {
      props.markers.forEach(marker => {
        addDomMarker(hMap, marker.img, marker.position)
      })
    }
    // eslint-disable-next-line
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap))
    // eslint-disable-next-line
    const ui = H.ui.UI.createDefault(hMap, defaultLayers)

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose()
    }
  }, [mapRef, props.centerPoint, props.userImg, props.markers])
  // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef} style={{ height: "500px" }} />
}