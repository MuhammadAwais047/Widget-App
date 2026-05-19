export interface Alarm {
  id: string
  time: string // "HH:MM"
  label: string
  active: boolean
}

export interface TimezoneCity {
  id: string
  city: string
  country: string
  offset: number
}

export interface TimerPreset {
  id: string
  label: string
  value: number // milliseconds
}

export const defaultAlarms: Alarm[] = [
  { id: '1', time: '07:00', label: 'Wake Up', active: true },
  { id: '2', time: '08:30', label: 'Morning Meds', active: false },
  { id: '3', time: '12:00', label: 'Lunch Break', active: true },
  { id: '4', time: '18:00', label: 'Evening Workout', active: false },
  { id: '5', time: '22:00', label: 'Bed Time', active: true },
]

export const defaultTimezones: TimezoneCity[] = [
  { id: '1', city: 'California', country: 'Los Angeles', offset: -7 },
  { id: '2', city: 'Berlin', country: 'Germany', offset: 2 },
  { id: '3', city: 'Tokyo', country: 'Japan', offset: 9 },
  { id: '4', city: 'London', country: 'UK', offset: 1 },
]

export const defaultPresets: TimerPreset[] = [
  { id: 'p1', label: '5 min', value: 5 * 60 * 1000 },
  { id: 'p2', label: '10 min', value: 10 * 60 * 1000 },
  { id: 'p3', label: '15 min', value: 15 * 60 * 1000 },
  { id: 'p4', label: '30 min', value: 30 * 60 * 1000 },
]
export const commonTimezones = [
  { city: 'New York', country: 'USA', offset: -4 },
  { city: 'Los Angeles', country: 'USA', offset: -7 },
  { city: 'Chicago', country: 'USA', offset: -5 },
  { city: 'London', country: 'UK', offset: 1 },
  { city: 'Berlin', country: 'Germany', offset: 2 },
  { city: 'Paris', country: 'France', offset: 2 },
  { city: 'Moscow', country: 'Russia', offset: 3 },
  { city: 'Dubai', country: 'UAE', offset: 4 },
  { city: 'Mumbai', country: 'India', offset: 5.5 },
  { city: 'Singapore', country: 'Singapore', offset: 8 },
  { city: 'Tokyo', country: 'Japan', offset: 9 },
  { city: 'Seoul', country: 'South Korea', offset: 9 },
  { city: 'Sydney', country: 'Australia', offset: 11 },
  { city: 'Auckland', country: 'New Zealand', offset: 13 },
]
