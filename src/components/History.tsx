import { useState } from 'react'
import './History.css'

type HistoryTab = 'alarms' | 'timers'

interface AlarmHistoryItem {
  time: string
  label: string
  date: string
  active: boolean
}

interface TimerHistoryItem {
  duration: string
  type: string
  date: string
}

const alarmHistory: AlarmHistoryItem[] = [
  { time: '07:00', label: 'Wake Up', date: 'Today', active: true },
  { time: '08:30', label: 'Morning Meds', date: 'Today', active: false },
  { time: '12:00', label: 'Lunch Break', date: 'Today', active: true },
  { time: '18:00', label: 'Evening Workout', date: 'Today', active: false },
  { time: '22:00', label: 'Bed Time', date: 'Yesterday', active: true },
  { time: '07:00', label: 'Wake Up', date: 'Yesterday', active: false },
  { time: '09:00', label: 'Meeting Reminder', date: 'Yesterday', active: false },
  { time: '21:00', label: 'Read Time', date: '2 days ago', active: false },
]

const timerHistory: TimerHistoryItem[] = [
  { duration: '25:00.00', type: 'Focus Session', date: 'Today, 10:30 AM' },
  { duration: '05:32.45', type: 'Quick Break', date: 'Today, 10:05 AM' },
  { duration: '15:00.00', type: 'Nap Timer', date: 'Today, 2:15 PM' },
  { duration: '45:12.80', type: 'Workout', date: 'Yesterday, 6:30 PM' },
  { duration: '10:00.00', type: 'Meditation', date: 'Yesterday, 7:00 AM' },
  { duration: '01:23:45.00', type: 'Study Session', date: '2 days ago' },
  { duration: '30:00.00', type: 'Cooking Timer', date: '2 days ago, 7:30 PM' },
  { duration: '08:15.30', type: 'Shower Timer', date: '3 days ago, 8:00 AM' },
]

export default function History() {
  const [activeTab, setActiveTab] = useState<HistoryTab>('alarms')

  return (
    <div className="history-screen">
      {/* Tab Switcher */}
      <div className="history-tab-switcher">
        <button
          className={`history-tab-btn ${activeTab === 'alarms' ? 'active' : ''}`}
          onClick={() => setActiveTab('alarms')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l2 2" />
            <path d="M5 3L2 6" />
            <path d="M22 6l-3-3" />
          </svg>
          Alarms
        </button>
        <button
          className={`history-tab-btn ${activeTab === 'timers' ? 'active' : ''}`}
          onClick={() => setActiveTab('timers')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          Timers
        </button>
      </div>

      {/* Section Header */}
      <div className="history-section-header">
        <h3 className="history-section-title">
          {activeTab === 'alarms' ? 'Recent Alarms' : 'Timer History'}
        </h3>
        <span className="history-count">{activeTab === 'alarms' ? alarmHistory.length : timerHistory.length} items</span>
      </div>

      {/* List */}
      <div className="history-list">
        {activeTab === 'alarms' ? (
          alarmHistory.map((item, i) => (
            <div key={i} className="history-item">
              <div className="history-item-left">
                <div className={`history-indicator ${item.active ? 'active' : 'inactive'}`} />
                <div className="history-item-info">
                  <div className="history-item-row">
                    <span className="history-item-time">{item.time}</span>
                    <span className="history-item-label">{item.label}</span>
                  </div>
                  <span className="history-item-date">{item.date}</span>
                </div>
              </div>
              <div className={`history-status-badge ${item.active ? 'active' : 'off'}`}>
                {item.active ? 'Active' : 'Off'}
              </div>
            </div>
          ))
        ) : (
          timerHistory.map((item, i) => (
            <div key={i} className="history-item">
              <div className="history-item-left">
                <div className="history-timer-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="history-item-info">
                  <div className="history-item-row">
                    <span className="history-item-duration">{item.duration}</span>
                    <span className="history-item-label">{item.type}</span>
                  </div>
                  <span className="history-item-date">{item.date}</span>
                </div>
              </div>
              <button className="history-repeat-btn" aria-label="Repeat timer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4v6h6M23 20v-6h-6" />
                  <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
