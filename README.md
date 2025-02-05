# World Time Zone App

A NextJS application that displays and manages multiple time zones with adjustable offsets.

## Features

- Display multiple time zones simultaneously
- Real-time updates
- Adjustable time offsets
- Live/Local fallback mode
- Responsive design
- Individual clock controls
- Automatic time synchronization
- Offline fallback support

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/simiel/world-time-zone-app
cd world-time-zone-app
````

2. Install dependencies:

```bash
yarn install
```

OR

```bash
npm install
```

3. Start the development server:

```bash
yarn dev
```

OR

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Usage

### Adding Time Zones

1. Enter a time zone identifier in the "Add Time Zone" input field
2. Click "Add" or press Enter
3. Valid formats: "Continent/City" (e.g., "Europe/London")

### Adjusting Time Offsets

- Use the offset input on individual clocks to adjust specific time zones
- Use the global offset control to adjust all time zones simultaneously
- Offsets are in minutes

### Removing Time Zones

- Click the "Remove" button on any clock card to remove that time zone

## Project Structure

```
├── app/
│   ├── api/
│   │   └── time/          # Time API endpoints
│   ├── TimeZoneApp.tsx    # Main application component
│   └── page.tsx           # Root page component
├── components/
│   ├── Clock.tsx          # Clock display component
│   ├── LoadingOverlay.tsx # Loading state component
│   └── ui/               # UI components
├── hooks/
│   └── useTimeZones.ts    # Time zone management hook
├── lib/
│   └── timeUtils.ts       # Time utility functions
└── public/               # Static assets
```

## API Reference

### GET /api/time

Fetches current time for specified time zones

Query Parameters:

- `zones` (required): Comma-separated list of time zone identifiers

Response:

```json
{
  "America/New_York": {
    "time": "2024-01-01T12:00:00.000Z",
    "isLive": true
  }
}
```

## Error Handling

The application includes:

- Fallback to local time when API is unavailable
- Visual indicators for live/local time status
- Loading states during data fetching
- Input validation for time zone formats

## Performance Optimizations

- Debounced input handling
- Efficient time updates
- React Suspense for loading states
- Next.js API route caching
- Optimized re-rendering

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [World Time API](http://worldtimeapi.org/) for time data
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Next.js](https://nextjs.org/) for the framework

```

```
