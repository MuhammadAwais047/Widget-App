import { useState } from 'react'
import type { Alarm, TimezoneCity, TimerPreset } from '../data'
import { commonTimezones } from '../data'
import './Settings.css'

interface AccentColorOption {
  name: string
  hex: string
  rgb: string
}

interface SettingsProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  accentColor: AccentColorOption
  accentColors: AccentColorOption[]
  onSetAccentColor: (color: AccentColorOption) => void
  alarms: Alarm[]
  onUpdateAlarms: (alarms: Alarm[]) => void
  timezones: TimezoneCity[]
  onUpdateTimezones: (timezones: TimezoneCity[]) => void
  presets: TimerPreset[]
  onUpdatePresets: (presets: TimerPreset[]) => void
  manualTimeOverride: string | null
  onSetManualTimeOverride: (override: string | null) => void
}

let nextAlarmId = 100
let nextTzId = 100
let nextPresetId = 100

export default function Settings({
  theme,
  onToggleTheme,
  accentColor,
  accentColors,
  onSetAccentColor,
  alarms, onUpdateAlarms,
  timezones, onUpdateTimezones,
  presets, onUpdatePresets,
  manualTimeOverride,
  onSetManualTimeOverride,
}: SettingsProps) {

  // ── Alarm section ──
  const [newAlarmTime, setNewAlarmTime] = useState('08:00')
  const [newAlarmLabel, setNewAlarmLabel] = useState('')
  const [showAddAlarm, setShowAddAlarm] = useState(false)

  const addAlarm = () => {
    if (!newAlarmLabel.trim()) return
    onUpdateAlarms([
      ...alarms,
      { id: String(nextAlarmId++), time: newAlarmTime, label: newAlarmLabel.trim(), active: true },
    ])
    setNewAlarmLabel('')
    setShowAddAlarm(false)
  }

  const deleteAlarm = (id: string) => {
    onUpdateAlarms(alarms.filter(a => a.id !== id))
  }

  const toggleAlarm = (id: string) => {
    onUpdateAlarms(alarms.map(a => a.id === id ? { ...a, active: !a.active } : a))
  }

  // ── World Cities section ──
  const [showAddCity, setShowAddCity] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCommon = commonTimezones.filter(
    tz => !timezones.some(t => t.city === tz.city && t.country === tz.country)
  ).filter(tz =>
    tz.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tz.country.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addCity = (city: string, country: string, offset: number) => {
    onUpdateTimezones([...timezones, { id: String(nextTzId++), city, country, offset }])
    setShowAddCity(false)
    setSearchQuery('')
  }

  const deleteCity = (id: string) => {
    onUpdateTimezones(timezones.filter(t => t.id !== id))
  }

  // ── Accordion state ──
  const [expandedSection, setExpandedSection] = useState<string | null>('alarms')

  const toggleSection = (id: string) => {
    setExpandedSection(prev => prev === id ? null : id)
  }

  // ── Timer Presets section ──
  const [showAddPreset, setShowAddPreset] = useState(false)
  const [presetLabel, setPresetLabel] = useState('')
  const [presetMinutes, setPresetMinutes] = useState(10)

  const addPreset = () => {
    if (!presetLabel.trim()) return
    onUpdatePresets([
      ...presets,
      { id: String(nextPresetId++), label: presetLabel.trim(), value: presetMinutes * 60 * 1000 },
    ])
    setPresetLabel('')
    setShowAddPreset(false)
  }

  const deletePreset = (id: string) => {
    onUpdatePresets(presets.filter(p => p.id !== id))
  }

  // ── Time Override section ──
  const [overrideDate, setOverrideDate] = useState(() => {
    const d = new Date()
    return d.toISOString().slice(0, 10)
  })
  const [overrideTime, setOverrideTime] = useState(() => {
    const d = new Date()
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  })

  const applyTimeOverride = () => {
    const iso = `${overrideDate}T${overrideTime}:00`
    onSetManualTimeOverride(iso)
  }

  const clearTimeOverride = () => {
    onSetManualTimeOverride(null)
  }

  return (
    <div className="settings-screen">
      <h2 className="settings-title">Settings</h2>

      {/* ── Theme / Accent Color ── */}
      <section className="settings-section">
        <div className="settings-section-header">
          <h3 className="settings-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 17.66l1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M6.34 17.66l-1.41 1.41" />
              <path d="M19.07 4.93l-1.41 1.41" />
            </svg>
            Theme
          </h3>
        </div>
        <p className="settings-theme-label">Accent Color</p>
        <div className="settings-swatches">
          {accentColors.map(color => (
            <button
              key={color.name}
              className={`settings-swatch${color.hex === accentColor.hex ? ' active' : ''}`}
              style={{ '--swatch-color': color.hex } as React.CSSProperties}
              onClick={() => onSetAccentColor(color)}
              aria-label={color.name}
              title={color.name}
            />
          ))}
        </div>

        <div className="settings-theme-row">
          <button className={`settings-theme-toggle ${theme === 'light' ? 'on' : ''}`} onClick={onToggleTheme}>
            <span className="settings-theme-toggle-track">
              <span className="settings-theme-toggle-thumb">
                {theme === 'dark' ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                )}
              </span>
            </span>
            <span className="settings-theme-toggle-label">
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </button>
        </div>
      </section>

      {/* ── Alarms Section (accordion) ── */}
      <section className="settings-section">
        <button className="settings-section-header settings-accordion-header" onClick={() => toggleSection('alarms')}>
          <h3 className="settings-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="13" r="8" />
              <path d="M12 9v4l2 2" />
              <path d="M5 3L2 6" />
              <path d="M22 6l-3-3" />
            </svg>
            Alarms
          </h3>
          <svg className={`settings-chevron${expandedSection === 'alarms' ? ' open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div className={`settings-accordion-body${expandedSection === 'alarms' ? ' open' : ''}`}>
          <div className="settings-accordion-content">
            <button className="settings-add-btn" onClick={() => setShowAddAlarm(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Alarm
          </button>

          {showAddAlarm && (
            <div className="settings-form">
              <div className="settings-form-row">
                <label className="settings-label">Time</label>
                <input
                  type="time"
                  className="settings-input settings-input-time"
                  value={newAlarmTime}
                  onChange={e => setNewAlarmTime(e.target.value)}
                />
              </div>
              <div className="settings-form-row">
                <label className="settings-label">Label</label>
                <input
                  type="text"
                  className="settings-input"
                  placeholder="e.g. Wake Up"
                  value={newAlarmLabel}
                  onChange={e => setNewAlarmLabel(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addAlarm()}
                />
              </div>
              <div className="settings-form-actions">
                <button className="settings-cancel-btn" onClick={() => setShowAddAlarm(false)}>Cancel</button>
                <button className="settings-save-btn" onClick={addAlarm}>Save</button>
              </div>
            </div>
          )}

          <div className="settings-list">
            {alarms.map(alarm => (
              <div key={alarm.id} className="settings-item">
                <div className="settings-item-info">
                  <span className="settings-item-primary">{alarm.time}</span>
                  <span className="settings-item-secondary">{alarm.label}</span>
                </div>
                <div className="settings-item-actions">
                  <label className={`settings-toggle ${alarm.active ? 'on' : ''}`}>
                    <input
                      type="checkbox"
                      checked={alarm.active}
                      onChange={() => toggleAlarm(alarm.id)}
                    />
                    <span className="settings-toggle-track" />
                  </label>
                  <button className="settings-delete-btn" onClick={() => deleteAlarm(alarm.id)} aria-label="Delete alarm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            {alarms.length === 0 && (
              <p className="settings-empty">No alarms set. Add one above.</p>
            )}
          </div>
        </div>
      </div>
    </section>

      {/* ── World Cities Section (accordion) ── */}
      <section className="settings-section">
        <button className="settings-section-header settings-accordion-header" onClick={() => toggleSection('cities')}>
          <h3 className="settings-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
              <path d="M2 12h20" />
            </svg>
            World Cities
          </h3>
          <svg className={`settings-chevron${expandedSection === 'cities' ? ' open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div className={`settings-accordion-body${expandedSection === 'cities' ? ' open' : ''}`}>
          <div className="settings-accordion-content">
            <button className="settings-add-btn" onClick={() => setShowAddCity(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add City
            </button>

            {showAddCity && (
              <div className="settings-form">
                <input
                  type="text"
                  className="settings-input"
                  placeholder="Search cities..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <div className="settings-city-results">
                  {filteredCommon.length === 0 ? (
                    <p className="settings-empty">No matching cities found.</p>
                  ) : (
                    filteredCommon.slice(0, 8).map(tz => (
                      <button
                        key={`${tz.city}-${tz.country}`}
                        className="settings-city-option"
                        onClick={() => addCity(tz.city, tz.country, tz.offset)}
                      >
                        <span className="settings-city-name">{tz.city}</span>
                        <span className="settings-city-country">{tz.country}</span>
                        <span className="settings-city-offset">UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}</span>
                      </button>
                    ))
                  )}
                </div>
                <div className="settings-form-actions">
                  <button className="settings-cancel-btn" onClick={() => { setShowAddCity(false); setSearchQuery('') }}>Cancel</button>
                </div>
              </div>
            )}

            <div className="settings-list">
              {timezones.map(tz => (
                <div key={tz.id} className="settings-item">
                  <div className="settings-item-info">
                    <span className="settings-item-primary">{tz.city}</span>
                    <span className="settings-item-secondary">{tz.country} · UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}</span>
                  </div>
                  <div className="settings-item-actions">
                    <button className="settings-delete-btn" onClick={() => deleteCity(tz.id)} aria-label="Delete city">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {timezones.length === 0 && (
                <p className="settings-empty">No cities added. Add one above.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Time Override Section (accordion) ── */}
      <section className="settings-section">
        <button className="settings-section-header settings-accordion-header" onClick={() => toggleSection('time-override')}>
          <h3 className="settings-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
              <path d="M12 2v2M15 4l-1 2" />
            </svg>
            Time Override
          </h3>
          <svg className={`settings-chevron${expandedSection === 'time-override' ? ' open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div className={`settings-accordion-body${expandedSection === 'time-override' ? ' open' : ''}`}>
          <div className="settings-accordion-content">
            <p className="settings-override-desc">
              Set a custom time for the World Clock to preview or test different times.
            </p>

            {manualTimeOverride ? (
              <div className="settings-override-active">
                <div className="settings-override-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Override Active</span>
                </div>
                <p className="settings-override-value">
                  {new Date(manualTimeOverride).toLocaleString('en-US', {
                    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </p>
                <button className="settings-override-reset" onClick={clearTimeOverride}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10" />
                    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                  </svg>
                  Reset to Real Time
                </button>
              </div>
            ) : (
              <div className="settings-override-form">
                <div className="settings-form-row">
                  <label className="settings-label" htmlFor="override-date">Date</label>
                  <input
                    id="override-date"
                    type="date"
                    className="settings-input"
                    value={overrideDate}
                    onChange={e => setOverrideDate(e.target.value)}
                  />
                </div>
                <div className="settings-form-row">
                  <label className="settings-label" htmlFor="override-time">Time</label>
                  <input
                    id="override-time"
                    type="time"
                    className="settings-input settings-input-time"
                    value={overrideTime}
                    onChange={e => setOverrideTime(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && applyTimeOverride()}
                  />
                </div>
                <div className="settings-form-actions">
                  <button className="settings-save-btn" onClick={applyTimeOverride}>
                    Apply Override
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Timer Presets Section (accordion) ── */}
      <section className="settings-section">
        <button className="settings-section-header settings-accordion-header" onClick={() => toggleSection('presets')}>
          <h3 className="settings-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
              <path d="M12 2v2M15 4l-1 2" />
            </svg>
            Timer Presets
          </h3>
          <svg className={`settings-chevron${expandedSection === 'presets' ? ' open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div className={`settings-accordion-body${expandedSection === 'presets' ? ' open' : ''}`}>
          <div className="settings-accordion-content">
            <button className="settings-add-btn" onClick={() => setShowAddPreset(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Preset
            </button>

            {showAddPreset && (
              <div className="settings-form">
                <div className="settings-form-row">
                  <label className="settings-label">Label</label>
                  <input
                    type="text"
                    className="settings-input"
                    placeholder="e.g. Workout"
                    value={presetLabel}
                    onChange={e => setPresetLabel(e.target.value)}
                  />
                </div>
                <div className="settings-form-row">
                  <label className="settings-label">Minutes</label>
                  <input
                    type="number"
                    className="settings-input settings-input-narrow"
                    min={1}
                    max={99}
                    value={presetMinutes}
                    onChange={e => setPresetMinutes(Math.max(1, Math.min(99, Number(e.target.value))))}
                    onKeyDown={e => e.key === 'Enter' && addPreset()}
                  />
                </div>
                <div className="settings-form-actions">
                  <button className="settings-cancel-btn" onClick={() => setShowAddPreset(false)}>Cancel</button>
                  <button className="settings-save-btn" onClick={addPreset}>Save</button>
                </div>
              </div>
            )}

            <div className="settings-list">
              {presets.map(preset => (
                <div key={preset.id} className="settings-item">
                  <div className="settings-item-info">
                    <span className="settings-item-primary">{preset.label}</span>
                    <span className="settings-item-secondary">{preset.value / 60000} min</span>
                  </div>
                  <div className="settings-item-actions">
                    <button className="settings-delete-btn" onClick={() => deletePreset(preset.id)} aria-label="Delete preset">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {presets.length === 0 && (
                <p className="settings-empty">No custom presets.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
