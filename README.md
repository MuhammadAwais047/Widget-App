# Widget Dashboard

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

<div align="center">
  <table>
    <tr>
      <td align="center"><img src="https://raw.githubusercontent.com/MuhammadAwais047/Widget-App/master/public/alarm.png" alt="Alarm Screen" width="240"/><br/><b>⏰ Alarm</b></td>
      <td align="center"><img src="https://raw.githubusercontent.com/MuhammadAwais047/Widget-App/master/public/world-clock.png" alt="World Clock Screen" width="240"/><br/><b>🌍 World Clock</b></td>
      <td align="center"><img src="https://raw.githubusercontent.com/MuhammadAwais047/Widget-App/master/public/stopwatch.png" alt="Stopwatch Screen" width="240"/><br/><b>⏱ Stopwatch</b></td>
    </tr>
    <tr>
      <td align="center"><img src="https://raw.githubusercontent.com/MuhammadAwais047/Widget-App/master/public/timer.png" alt="Timer Screen" width="240"/><br/><b>⏲ Timer</b></td>
      <td align="center"><img src="https://raw.githubusercontent.com/MuhammadAwais047/Widget-App/master/public/history.png" alt="History Screen" width="240"/><br/><b>📋 History</b></td>
      <td align="center"><img src="https://raw.githubusercontent.com/MuhammadAwais047/Widget-App/master/public/settings.png" alt="Settings Screen" width="240"/><br/><b>⚙️ Settings</b></td>
    </tr>
  </table>
</div>

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
