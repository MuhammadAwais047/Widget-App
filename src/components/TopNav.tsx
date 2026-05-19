import './TopNav.css'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
}

interface TopNavProps {
  items: NavItem[]
  activeId: string
  onSelect: (id: string) => void
}

export default function TopNav({ items, activeId, onSelect }: TopNavProps) {
  return (
    <nav className="topnav" aria-label="Screen navigation">
      <div className="topnav-inner">
        {items.map(item => (
          <button
            key={item.id}
            className={`topnav-item ${activeId === item.id ? 'active' : ''}`}
            onClick={() => onSelect(item.id)}
            aria-current={activeId === item.id ? 'page' : undefined}
          >
            <div className="topnav-icon" aria-hidden="true">{item.icon}</div>
            <span className="topnav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
