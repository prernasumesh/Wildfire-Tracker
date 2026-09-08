import {useState, useEffect} from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'

const DEFAULT_CENTER = {lat: 42.3265, lng: -122.8756}
const DEFAULT_ZOOM = 5
const FOCUS_ZOOM = 8

const Map = ({eventData, selectedEvent, onSelectMarker}) => {
    const [locationInfo, setLocationInfo] = useState(null)
    const [center, setCenter] = useState(DEFAULT_CENTER)
    const [zoom, setZoom] = useState(DEFAULT_ZOOM)

    useEffect(() => {
        if (selectedEvent) {
            const [lng, lat] = selectedEvent.geometries[selectedEvent.geometries.length - 1].coordinates
            setCenter({lat, lng})
            setZoom(FOCUS_ZOOM)
            setLocationInfo({id: selectedEvent.id, title: selectedEvent.title})
        }
    }, [selectedEvent])

    const handleMarkerClick = (ev) => {
        setLocationInfo({id: ev.id, title: ev.title})
        onSelectMarker(ev.id)
    }

    const markers = eventData.map(ev => {
        const [lng, lat] = ev.geometries[ev.geometries.length - 1].coordinates
        return (
            <LocationMarker
                key={ev.id}
                lat={lat}
                lng={lng}
                active={selectedEvent?.id === ev.id}
                onClick={() => handleMarkerClick(ev)}
            />
        )
    })

    return (
        <div className = "map">
            <GoogleMapReact
                bootstrapURLKeys = {{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                center = {center}
                zoom = {zoom}
            >
                {markers}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} onClose={() => setLocationInfo(null)}/>}
        </div>
    )
}
export default Map
