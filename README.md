# WeaveApp - Family Calendar (React Native)

A React Native mobile application for family calendar management, converted from a web-based application.

## Features

- 📱 Native mobile experience on iOS and Android
- 📅 Calendar view for managing family events
- 📋 Feed view for upcoming events
- 🗺️ Map view to visualize event locations
- ➕ Create and edit events
- 👥 Multi-user support with color-coded avatars
- ⚙️ Settings for profile management

## Tech Stack

- **React Native** with **Expo**
- **TypeScript** for type safety
- **React Navigation** for bottom tab navigation
- **React Native Maps** for map functionality
- **React Native SVG** for icon rendering
- **@google/generative-ai** for AI features

## Prerequisites

- Node.js (v20.19.5 or higher)
- npm (v10.8.2 or higher)
- Expo CLI
- iOS Simulator (Mac) or Android Emulator for testing

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. (Optional) Set up Google Maps API key:
   - Edit `app.json`
   - Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key

## Running the App

### Start the development server:
```bash
npm start
```

### Run on specific platforms:

- **iOS**: Press `i` in the terminal or run `npm run ios`
- **Android**: Press `a` in the terminal or run `npm run android`
- **Web**: Press `w` in the terminal or run `npm run web`

### Using Expo Go:
1. Install **Expo Go** app on your iOS or Android device
2. Scan the QR code shown in the terminal
3. The app will load on your device

## Project Structure

```
webapp/
├── App.tsx                 # Main app component with navigation
├── app.json               # Expo configuration
├── types.ts               # TypeScript type definitions
├── constants.ts           # App constants and mock data
├── components/
│   ├── FeedView.tsx       # Upcoming events feed
│   ├── CalendarView/      # Calendar grid view
│   ├── CreateEventView.tsx # Event creation/editing
│   ├── MapView/           # Map with event locations
│   ├── SettingsView.tsx   # User settings
│   └── icons/             # SVG icon components
├── hooks/                 # Custom React hooks
├── services/              # API services
├── utils/                 # Utility functions
└── web-backup/            # Original web app backup
```

## Key Changes from Web Version

### Component Updates
- ✅ Replaced `<div>`, `<button>`, `<input>` with React Native components
- ✅ Converted Tailwind CSS to React Native StyleSheet
- ✅ Implemented React Navigation for bottom tabs
- ✅ Converted all SVG icons to use `react-native-svg`
- ✅ Added SafeAreaView for proper mobile layout

### Navigation
- Bottom tab navigation with 5 screens:
  - Feed
  - Calendar
  - Create
  - Map
  - Settings

### Styling
- All styles converted from CSS classes to StyleSheet objects
- Color system using hex values instead of Tailwind classes
- Responsive layouts using Flexbox

## Development Notes

### Maps Configuration
To use maps functionality:
1. Get a Google Maps API key
2. Update `app.json` with your API key
3. For iOS, also update the `config.googleMapsApiKey` field
4. For Android, update `config.googleMaps.apiKey` field

### Location Permissions
The app requests location permissions for map features. Make sure to:
- Grant location permissions when prompted
- For iOS simulator, you may need to set a custom location

## Troubleshooting

### Metro Bundler Issues
If you encounter bundling issues:
```bash
npm start -- --reset-cache
```

### Dependency Conflicts
If you see version warnings:
```bash
npx expo install --fix
```

### Clear Cache
```bash
npm start -- --clear
```

## Original Web Version

The original web application is backed up in the `web-backup/` directory for reference.

## Future Enhancements

- [ ] Complete Calendar grid implementation with month view
- [ ] Add event editing from Calendar view
- [ ] Implement date/time pickers for event creation
- [ ] Add location picker for events
- [ ] Implement user authentication
- [ ] Add push notifications for event reminders
- [ ] Sync with device calendar
- [ ] Add recurring events support

## License

Private

## Version

1.0.0 - React Native Conversion
