const LocationInfoBox = ({ info, onClose }) => {
    return (
        <div className="location-info">
            <button className="location-info-close" onClick={onClose} aria-label="Close">×</button>
            <h2>Event Location Information</h2>
            <ul>
                <li>ID: <strong>{info.id}</strong></li>
                <li>TITLE: <strong>{info.title}</strong></li>
            </ul>
        </div>
    )
}

export default LocationInfoBox
