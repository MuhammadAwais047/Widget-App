import { useState, useEffect, useRef } from 'react'
import type { TimerPreset } from '../data'
import './Timer.css'

interface TimerProps {
  presets: TimerPreset[]
}

type TimerStatus = 'idle' | 'running' | 'paused' | 'complete'

export default function Timer({ presets }: TimerProps) {
  const intervalRef = useRef<number | null>(null)
  const startTimeRef = useRef(0)
  const remainingAtStartRef = useRef(0)
  const [totalMs, setTotalMs] = useState(5 * 60 * 1000)
  const [remainingMs, setRemainingMs] = useState(5 * 60 * 1000)
  const [status, setStatus] = useState<TimerStatus>('idle')

  useEffect(() => {
    if (status === 'running') {
      const tick = () => {
        const elapsed = Date.now() - startTimeRef.current
        const remaining = Math.max(0, remainingAtStartRef.current - elapsed)
        setRemainingMs(remaining)
        if (remaining <= 0) {
          setStatus('complete')
        }
      }
      tick()
      intervalRef.current = window.setInterval(tick, 10)
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [status])

  const startTimer = () => {
    startTimeRef.current = Date.now()
    remainingAtStartRef.current = remainingMs
    setStatus('running')
  }

  const pauseTimer = () => {
    setStatus('paused')
  }

  const handleStartPause = () => {
    if (status === 'complete') {
      // Restart from full duration
      setRemainingMs(totalMs)
      startTimeRef.current = Date.now()
      remainingAtStartRef.current = totalMs
      setStatus('running')
    } else if (status === 'idle' || status === 'paused') {
      startTimer()
    } else if (status === 'running') {
      pauseTimer()
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setRemainingMs(totalMs)
  }

  const setDuration = (ms: number) => {
    if (status === 'idle') {
      setTotalMs(ms)
      setRemainingMs(ms)
    }
  }

  const adjustMinutes = (delta: number) => {
    if (status === 'idle') {
      const newMs = Math.max(60 * 1000, Math.min(99 * 60 * 1000, totalMs + delta * 60 * 1000))
      setTotalMs(newMs)
      setRemainingMs(newMs)
    }
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const isComplete = status === 'complete'

  return (
    <div className="timer-screen">
      {/* Time Display */}
      <div className="timer-time-display">
        <span className={`timer-main-time ${isComplete ? 'complete' : ''}`}>
          {formatTime(remainingMs)}
        </span>
      </div>

      {/* Duration Adjustment (idle only) */}
      {status === 'idle' && (
        <>
          <div className="timer-adjust">
            <button
              className="timer-adjust-btn"
              onClick={() => adjustMinutes(-1)}
              aria-label="Decrease by 1 minute"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <span className="timer-adjust-label">{Math.floor(totalMs / 60000)} min</span>
            <button
              className="timer-adjust-btn"
              onClick={() => adjustMinutes(1)}
              aria-label="Increase by 1 minute"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          <div className="timer-presets">
            {presets.map(preset => (
              <button
                key={preset.id}
                className={`timer-preset-chip ${totalMs === preset.value ? 'active' : ''}`}
                onClick={() => setDuration(preset.value)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Completion message */}
      {isComplete && (
        <div className="timer-complete-msg">Time's up!</div>
      )}

      {/* Controls */}
      <div className="timer-control-group">
        {status !== 'idle' && (
          <button className="timer-btn timer-btn-secondary" onClick={handleReset}>
            Reset
          </button>
        )}
        <button
          className={`timer-btn ${status === 'running' ? 'timer-btn-pause' : 'timer-btn-primary'} ${status === 'idle' ? 'timer-btn-single' : ''}`}
          onClick={handleStartPause}
        >
          {status === 'running' ? 'Pause' : status === 'complete' ? 'Restart' : 'Start'}
        </button>
      </div>
    </div>
  )
}
