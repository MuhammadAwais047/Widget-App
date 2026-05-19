import { useState, useEffect } from 'react'
import TopNav from './components/TopNav'
import AlarmClock from './components/AlarmClock'
import WorldTime from './components/WorldTime'
import Stopwatch from './components/Stopwatch'
import Timer from './components/Timer'
import History from './components/History'
import Settings from './components/Settings'
import type { Alarm, TimezoneCity, TimerPreset } from './data'
import { defaultAlarms, defaultTimezones, defaultPresets } from './data'
import './App.css'

const screens = [
  { id: 'alarm', label: 'Alarm', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2" />
      <path d="M5 3L2 6" />
      <path d="M22 6l-3-3" />
      <path d="M6.38 18.7L4 21" />
      <path d="M17.64 18.67L20 21" />
    </svg>
  )},
  { id: 'time', label: 'Time', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
      <path d="M2 12h20" />
    </svg>
  )},
  { id: 'stopwatch', label: 'Stopwatch', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )},
  { id: 'timer', label: 'Timer', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
      <path d="M12 2v2M15 4l-1 2" />
    </svg>
  )},
  { id: 'history', label: 'History', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )},
  { id: 'settings', label: 'Settings', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  )},
]

const ACCENT_COLORS = [
  { name: 'Red', hex: '#FF3B30', rgb: '255, 59, 48' },
  { name: 'Cyan', hex: '#00E5FF', rgb: '0, 229, 255' },
  { name: 'Blue', hex: '#3B82F6', rgb: '59, 130, 246' },
  { name: 'Green', hex: '#22C55E', rgb: '34, 197, 94' },
  { name: 'Purple', hex: '#A855F7', rgb: '168, 85, 247' },
  { name: 'Orange', hex: '#F97316', rgb: '249, 115, 22' },
  { name: 'Pink', hex: '#EC4899', rgb: '236, 72, 153' },
  { name: 'Yellow', hex: '#EAB308', rgb: '234, 179, 8' },
]

function App() {
  const [activeScreen, setActiveScreen] = useState('alarm')

  // Persisted configurable state
  const loadTheme = (): 'dark' | 'light' => {
    try {
      const saved = localStorage.getItem('widget-theme')
      if (saved === 'dark' || saved === 'light') return saved
    } catch {}
    return 'dark'
  }

  const loadAccentIndex = (): number => {
    try {
      const saved = localStorage.getItem('widget-accent-index')
      const idx = Number(saved)
      if (!isNaN(idx) && idx >= 0 && idx < ACCENT_COLORS.length) return idx
    } catch {}
    return 0
  }

  const [accentColor, setAccentColor] = useState(() => ACCENT_COLORS[loadAccentIndex()])
  const [theme, setTheme] = useState<'dark' | 'light'>(() => loadTheme())

  // Persist preferences on change
  useEffect(() => {
    localStorage.setItem('widget-theme', theme)
  }, [theme])

  useEffect(() => {
    const idx = ACCENT_COLORS.findIndex(c => c.hex === accentColor.hex)
    if (idx !== -1) localStorage.setItem('widget-accent-index', String(idx))
  }, [accentColor])

  // Apply accent color + theme to #root
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.setProperty('--accent-color', accentColor.hex)
      root.style.setProperty('--accent-color-rgb', accentColor.rgb)
      root.setAttribute('data-theme', theme)
    }
  }, [accentColor, theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // ── Time Override ──
  const loadTimeOverride = (): string | null => {
    try {
      const saved = localStorage.getItem('widget-time-override')
      return saved || null
    } catch { return null }
  }

  const [manualTimeOverride, setManualTimeOverride] = useState<string | null>(() => loadTimeOverride())

  useEffect(() => {
    if (manualTimeOverride) {
      localStorage.setItem('widget-time-override', manualTimeOverride)
    } else {
      localStorage.removeItem('widget-time-override')
    }
  }, [manualTimeOverride])

  const [alarms, setAlarms] = useState<Alarm[]>(defaultAlarms)
  const [timezones, setTimezones] = useState<TimezoneCity[]>(defaultTimezones)
  const [presets, setPresets] = useState<TimerPreset[]>(defaultPresets)

  const renderScreen = () => {
    switch (activeScreen) {
      case 'alarm':
        return <AlarmClock alarms={alarms} onToggleAlarm={(id) =>
          setAlarms(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a))
        } />
      case 'time':
        return <WorldTime timezones={timezones} timeOverride={manualTimeOverride} />
      case 'stopwatch':
        return <Stopwatch />
      case 'timer':
        return <Timer presets={presets} />
      case 'history':
        return <History />
      case 'settings':
        return (
          <Settings
            theme={theme}
            onToggleTheme={toggleTheme}
            accentColor={accentColor}
            accentColors={ACCENT_COLORS}
            onSetAccentColor={setAccentColor}
            alarms={alarms}
            onUpdateAlarms={setAlarms}
            timezones={timezones}
            onUpdateTimezones={setTimezones}
            presets={presets}
            onUpdatePresets={setPresets}
            manualTimeOverride={manualTimeOverride}
            onSetManualTimeOverride={setManualTimeOverride}
          />
        )
      default:
        return <AlarmClock alarms={alarms} onToggleAlarm={(id) =>
          setAlarms(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a))
        } />
    }
  }

  return (
    <div className="app">
      <TopNav
        items={screens}
        activeId={activeScreen}
        onSelect={setActiveScreen}
      />

      <main className="screen-content">
        <div className="screen-transition" key={activeScreen}>
          {renderScreen()}
        </div>
      </main>
    </div>
  )
}

export default App
