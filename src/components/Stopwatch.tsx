import { useState, useEffect, useRef } from 'react'
import './Stopwatch.css'

export default function Stopwatch() {
  const timerIdRef = useRef<number | null>(null)
  const startTimeRef = useRef(0)
  const lapCountRef = useRef(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<{ count: number; time: number }[]>([])

  const CIRCUMFERENCE = 628 // 2 * PI * 100

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime
      timerIdRef.current = window.setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current)
      }, 10)
    } else {
      if (timerIdRef.current !== null) {
        clearInterval(timerIdRef.current)
        timerIdRef.current = null
      }
    }
    return () => {
      if (timerIdRef.current !== null) {
        clearInterval(timerIdRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return {
      main: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      ms: `.${String(centiseconds).padStart(2, '0')}`,
    }
  }

  const currentCycle = (elapsedTime % 60000) / 60000
  const strokeOffset = CIRCUMFERENCE - currentCycle * CIRCUMFERENCE

  const handleStartPause = () => {
    setIsRunning(prev => !prev)
  }

  const handleLapReset = () => {
    if (isRunning) {
      lapCountRef.current += 1
      setLaps(prev => [{ count: lapCountRef.current, time: elapsedTime }, ...prev])
    } else {
      setElapsedTime(0)
      setLaps([])
      lapCountRef.current = 0
    }
  }

  const time = formatTime(elapsedTime)

  return (
    <div className="stopwatch-screen">
      {/* Progress Ring */}
      <div className="stopwatch-center">
        <svg className="progress-svg" viewBox="0 0 240 240" aria-hidden="true">
          <circle className="progress-bg" cx="120" cy="120" r="100" />
          <circle
            className="progress-bar"
            cx="120"
            cy="120"
            r="100"
            style={{ strokeDashoffset: strokeOffset }}
          />
        </svg>
        <div className="time-wrapper">
          <span className="main-time">{time.main}</span>
          <span className="ms-time">{time.ms}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="control-group">
        <button
          className="btn btn-secondary"
          onClick={handleLapReset}
          disabled={!isRunning && elapsedTime === 0}
        >
          {isRunning ? 'Lap' : 'Reset'}
        </button>
        <button
          className={`btn ${isRunning ? 'btn-pause' : 'btn-primary'}`}
          onClick={handleStartPause}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>

      {/* Lap History */}
      <div className="lap-container">
        {laps.length === 0 && (
          <div className="lap-empty">No laps recorded yet</div>
        )}
        {laps.map(lap => {
          const lapTime = formatTime(lap.time)
          return (
            <div key={lap.count} className="lap-row">
              <span className="lap-label">Lap {lap.count}</span>
              <span className="lap-timestamp">{lapTime.main}{lapTime.ms}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
