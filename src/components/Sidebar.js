const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})

const Sidebar = ({fires, search, onSearch, selectedId, onSelect}) => {
    return (
        <aside className="sidebar">
            <input
                className="sidebar-search"
                type="text"
                placeholder="Search fires by name..."
                value={search}
                onChange={(e) => onSearch(e.target.value)}
            />
            <p className="sidebar-count">{fires.length} fire{fires.length !== 1 ? 's' : ''}</p>
            <ul className="sidebar-list">
                {fires.map(fire => {
                    const latest = fire.geometries[fire.geometries.length - 1]
                    return (
                        <li
                            key={fire.id}
                            className={`sidebar-item ${fire.id === selectedId ? 'active' : ''}`}
                            onClick={() => onSelect(fire.id)}
                        >
                            <span className="sidebar-item-title">{fire.title}</span>
                            <span className="sidebar-item-date">{formatDate(latest.date)}</span>
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}

export default Sidebar
