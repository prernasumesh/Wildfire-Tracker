import {useState, useEffect, useMemo} from 'react'
import Map from './components/Map'
import Loader from './components/Loader'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AiBriefing from './components/AiBriefing'

const WILDFIRE_CATEGORY_ID = 8
const RECENT_DAYS = 30

const latestGeometry = (event) => event.geometries[event.geometries.length - 1]

function App() {
  const[eventData, setEventData] = useState([])
  const[loading, setLoading] = useState(false)
  const[selectedId, setSelectedId] = useState(null)
  const[search, setSearch] = useState('')

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events')
      const {events} = await res.json()
      setEventData(events)
      setLoading(false)
    }

    fetchEvents()

  }, [])

  const wildfires = useMemo(() => {
    const cutoff = Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000
    return eventData
      .filter(ev => ev.categories[0].id === WILDFIRE_CATEGORY_ID)
      .filter(ev => new Date(latestGeometry(ev).date).getTime() >= cutoff)
      .sort((a, b) => new Date(latestGeometry(b).date) - new Date(latestGeometry(a).date))
  }, [eventData])

  const visibleFires = useMemo(() => {
    if (!search.trim()) return wildfires
    const query = search.toLowerCase()
    return wildfires.filter(ev => ev.title.toLowerCase().includes(query))
  }, [wildfires, search])

  const selectedEvent = wildfires.find(ev => ev.id === selectedId) || null

  return (
    <div>
      <Header count={wildfires.length} />
      {!loading ? (
        <>
          <Sidebar
            fires={visibleFires}
            search={search}
            onSearch={setSearch}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <AiBriefing wildfires={wildfires} />
          <Map
            eventData={wildfires}
            selectedEvent={selectedEvent}
            onSelectMarker={setSelectedId}
          />
        </>
      ) : <Loader />}
    </div>
  );
}

export default App;
