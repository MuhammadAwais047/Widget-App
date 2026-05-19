import { useState, useEffect, useRef } from 'react'
import type { TimezoneCity } from '../data'
import './WorldTime.css'

interface WorldTimeProps {
  timezones: TimezoneCity[]
  timeOverride?: string | null
}

function formatTimeWithOffset(baseDate: Date, offsetHours: number): string {
  const localOffset = baseDate.getTimezoneOffset() / 60
  const totalOffset = offsetHours + localOffset
  const adjusted = new Date(baseDate.getTime() + totalOffset * 3600000)
  return adjusted.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export default function WorldTime({ timezones, timeOverride }: WorldTimeProps) {
  const overrideStartRef = useRef<number | null>(null)
  const overrideBaseRef = useRef<number | null>(null)

  // Reset override timestamps whenever the override value changes
  useEffect(() => {
    if (timeOverride) {
      overrideStartRef.current = Date.now()
      overrideBaseRef.current = new Date(timeOverride).getTime()
    } else {
      overrideStartRef.current = null
      overrideBaseRef.current = null
    }
  }, [timeOverride])

  const getDisplayTime = (): Date => {
    if (overrideBaseRef.current !== null && overrideStartRef.current !== null) {
      const elapsed = Date.now() - overrideStartRef.current
      return new Date(overrideBaseRef.current + elapsed)
    }
    return new Date()
  }

  const [now, setNow] = useState(() => timeOverride ? new Date(timeOverride) : new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(getDisplayTime()), 1000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeOverride])

  const currentTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  })

  const today = now.toLocaleDateString('en-US', {
    weekday: 'long', month: 'numeric', day: 'numeric', year: '2-digit',
  })

  return (
    <div className="world-time">
      {/* Time Hero with World Map */}
      <div className="world-hero">
        <div className="world-map-bg">
          <img src="/world-map.svg" alt="" className="world-map-image" />
        </div>
        <div className="world-hero-glow" />
        <div className="world-content">
          <h2 className="world-time-main">{currentTime}</h2>
          <p className="world-date">{today}</p>
          <p className="world-location-main">{timezones.length > 0 ? timezones[0].city : 'No location'}</p>
        </div>
      </div>

      {/* Timezone List */}
      <div className="timezone-list">
        {timezones.map((tz) => (
          <div key={tz.city} className="timezone-item">
            <div className="tz-info">
              <span className="tz-city">{tz.city}</span>
              <span className="tz-country">{tz.country}</span>
            </div>
            <span className="tz-time">{formatTimeWithOffset(now, tz.offset)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
