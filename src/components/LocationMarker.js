import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/fire-alert'

const LocationMarker = ({lat, lng, active, onClick}) => {
    return (
        <div className = "location-marker" onClick = {onClick}>
            <Icon icon = {locationIcon} className={`location-icon ${active ? 'location-icon-active' : ''}`} />
        </div>
    )
}

export default LocationMarker
