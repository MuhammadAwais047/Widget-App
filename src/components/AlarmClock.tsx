import { useState, useEffect } from 'react'
import type { Alarm } from '../data'
import './AlarmClock.css'

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

interface AlarmClockProps {
  alarms: Alarm[]
  onToggleAlarm: (id: string) => void
}

export default function AlarmClock({ alarms, onToggleAlarm }: AlarmClockProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  const hourDeg = ((hours % 12) * 30) + (minutes * 0.5)
  const minuteDeg = minutes * 6 + seconds * 0.1
  const secondDeg = seconds * 6

  const today = time.getDay() === 0 ? 6 : time.getDay() - 1 // Monday=0

  const format12h = (h: number, m: number) => {
    const period = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 || 12
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`
  }

  const formatAlarmTime = (time24: string) => {
    const [h, m] = time24.split(':').map(Number)
    return format12h(h, m)
  }

  const currentHour = hours.toString().padStart(2, '0')
  const currentMin = minutes.toString().padStart(2, '0')

  return (
    <div className="alarm-screen">
      <div className="alarm-container">
        {/* Day labels */}
        <div className="alarm-days">
          {days.map((day, i) => (
            <span key={i} className={`alarm-day ${i === today ? 'active' : ''}`}>
              {day}
            </span>
          ))}
        </div>

        {/* Clock face */}
        <div className="alarm-clock-face" role="timer" aria-label={`Current time: ${currentHour}:${currentMin}`}>
          {/* Tick marks */}
          <div className="clock-ticks">
            {Array.from({ length: 60 }, (_, i) => (
              <div
                key={i}
                className={`tick ${i % 15 === 0 ? 'major' : i % 5 === 0 ? 'medium' : ''}`}
                style={{ transform: `rotate(${i * 6}deg)` }}
              />
            ))}
          </div>

          {/* Numbers */}
          <div className="clock-nums">
            <span className="clock-num num-12">12</span>
            <span className="clock-num num-3">03</span>
            <span className="clock-num num-6">06</span>
            <span className="clock-num num-9">09</span>
          </div>

          {/* Gradient ring */}
          <svg className="clock-ring" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="88" fill="none" stroke="url(#ringGrad)" strokeWidth="3" />
          </svg>

          {/* Clock hands */}
          <div className="clock-hands">
            <div className="hand hour-hand" style={{ transform: `rotate(${hourDeg}deg)` }} />
            <div className="hand minute-hand" style={{ transform: `rotate(${minuteDeg}deg)` }} />
            <div className="hand second-hand" style={{ transform: `rotate(${secondDeg}deg)` }} />
            <div className="clock-center" />
          </div>
        </div>

        {/* Digital time — below the clock face */}
        <div className="clock-digital">
          <span className="digi-time">{format12h(hours, minutes)}</span>
        </div>

        {/* Alarm Schedule */}
        <div className="alarm-schedule">
          <h3 className="alarm-schedule-title">Alarm Schedule</h3>
          <div className="alarm-items">
            {alarms.map(alarm => (
              <div key={alarm.id} className="alarm-row">
                <div className="alarm-row-left">
                  <span className="alarm-row-time">{formatAlarmTime(alarm.time)}</span>
                  <span className="alarm-row-label">{alarm.label}</span>
                </div>
                <label className="alarm-toggle">
                  <input
                    type="checkbox"
                    checked={alarm.active}
                    onChange={() => onToggleAlarm(alarm.id)}
                  />
                  <span className="toggle-track" />
                </label>
              </div>
            ))}
            {alarms.length === 0 && (
              <p style={{ textAlign: 'center', color: '#6B7280', fontFamily: 'Inter', fontSize: '0.85rem', padding: '16px 0' }}>
                No alarms. Add one in Settings.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
