# Widget Dashboard

<p align="center">
  <img src="https://img.shields.io/github/license/MuhammadAwais047/Widget-App" alt="License: MIT"/>
</p>

A feature-rich widget dashboard built with **React + TypeScript + Vite**, designed as a mobile-first single-page application.

## Features

| Widget | Description |
|--------|-------------|
| ⏰ **Alarm** | Analog clock with day indicators, digital time (AM/PM), and alarm schedule management |
| 🌍 **World Clock** | Current time with date, plus configurable timezone cities (California, Berlin, Tokyo, London, etc.) |
| ⏱ **Stopwatch** | Precision stopwatch with start/stop/reset controls |
| ⏲ **Timer** | Countdown timer with preset durations and manual time adjustment |
| 📋 **History** | Log of past alarms and timer sessions |
| ⚙️ **Settings** | Theme switcher (dark/light), manage alarms, world cities, timer presets, and manual time override |

### Highlights

- **Dark/Light theme** with smooth transitions
- **Responsive** mobile-first layout with phone-frame styling on desktop
- **Settings accordion** for collapsible sections (Alarms, World Cities, Timer Presets)
- **Manual Time Override** — set a custom date/time in Settings to preview the World Clock at a different moment
- **Persistent data** via `localStorage` (alarms, cities, presets, theme, time override)
- **AM/PM time formatting** throughout

## Screenshots

| ⏰ Alarm | 🌍 World Clock | ⏱ Stopwatch |
|---|---|---|
| ![Alarm Screen](public/alarm.png) | ![World Clock Screen](public/world-clock.png) | ![Stopwatch Screen](public/stopwatch.png) |
| ⏲ Timer | 📋 History | ⚙️ Settings |
| ![Timer Screen](public/timer.png) | ![History Screen](public/history.png) | ![Settings Screen](public/settings.png) |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 18** with functional components and hooks
- **TypeScript** for type safety
- **Vite** for fast development and builds
- **CSS** with custom properties (no CSS framework)

## Project Structure

```
widget-app/
├── public/           # Static assets + screenshots
├── src/
│   ├── components/   # React components
│   │   ├── AlarmClock.tsx
│   │   ├── WorldTime.tsx
│   │   ├── Stopwatch.tsx
│   │   ├── Timer.tsx
│   │   ├── History.tsx
│   │   ├── Settings.tsx
│   │   └── TopNav.tsx
│   ├── data.ts       # Default data (alarms, cities, presets)
│   ├── App.tsx       # Main app shell
│   ├── App.css       # App layout styles
│   ├── index.css     # Global styles + theme variables
│   └── main.tsx      # Entry point
├── index.html
└── package.json
```
