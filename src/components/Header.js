import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/fire-alert'

const Header = ({count}) => {
    return (
        <header className = "header">
            <h1><Icon icon = {locationIcon}/> Wildfire Tracker (Powered by NASA)</h1>
            {typeof count === 'number' &&
                <p className="header-subtitle">{count} active wildfire{count !== 1 ? 's' : ''} in the last 30 days</p>
            }
        </header>
    )
}

export default Header
