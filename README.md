# WeaveApp - Family Calendar (React Native)

A React Native mobile application for family calendar management, built with **Expo Router** for file-based routing.

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
- **Expo Router** for file-based routing (v6)
- **TypeScript** for type safety
- **React Native Maps** for map functionality
- **React Native SVG** for icon rendering
- **@google/generative-ai** for AI features

## Project Structure

```
webapp/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab layout group
│   │   ├── _layout.tsx    # Bottom tabs navigator
│   │   ├── index.tsx      # Feed screen (default tab)
│   │   ├── calendar.tsx   # Calendar screen
│   │   ├── create.tsx     # Create event screen
│   │   ├── map.tsx        # Map screen
│   │   └── settings.tsx   # Settings screen
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # App entry point
├── components/            # Reusable React Native components
│   ├── FeedView.tsx
│   ├── CalendarView/
│   ├── CreateEventView.tsx
│   ├── MapView/
│   ├── SettingsView.tsx
│   └── icons/            # SVG icon components
├── types.ts              # TypeScript type definitions
├── constants.ts          # App constants and mock data
├── hooks/                # Custom React hooks
├── services/             # API services
├── utils/                # Utility functions
└── web-backup/           # Original web app backup
```

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

## Expo Router File-Based Routing

This project uses **Expo Router** which provides file-based routing similar to Next.js:

### Route Structure:
- `app/(tabs)/_layout.tsx` - Defines bottom tab navigation
- `app/(tabs)/index.tsx` - Feed screen (/ route)
- `app/(tabs)/calendar.tsx` - Calendar screen (/calendar)
- `app/(tabs)/create.tsx` - Create event screen (/create)
- `app/(tabs)/map.tsx` - Map screen (/map)
- `app/(tabs)/settings.tsx` - Settings screen (/settings)

### Navigation:
```typescript
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/calendar');  // Navigate to calendar
router.back();              // Go back
```

### Layout Groups:
- `(tabs)` - Layout group for bottom tab navigation
- Files in layout groups share the same navigation structure

## Key Features

### Bottom Tab Navigation
- 5 tabs: Feed, Calendar, Create, Map, Settings
- Custom SVG icons for each tab
- Active/inactive states with color changes

### Screens
- **Feed**: Shows upcoming events sorted by date
- **Calendar**: Calendar grid view (placeholder for full implementation)
- **Create**: Form to create/edit events
- **Map**: React Native Maps showing event locations and user positions
- **Settings**: User profile and app information

### Styling
- All styles use React Native StyleSheet
- Color system using hex values
- Responsive layouts with Flexbox
- SafeAreaView for proper mobile layout

## Development Notes

### Expo Router Benefits
- ✅ File-based routing (like Next.js)
- ✅ Type-safe navigation
- ✅ Deep linking support out of the box
- ✅ Easy to add new screens (just add files)
- ✅ Automatic route generation
- ✅ Layout groups for shared navigation

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

### Expo Router Issues
If routes aren't working:
```bash
rm -rf .expo
npm start -- --clear
```

## Migration History

### v1.0.0 - Initial React Native Conversion
- Converted web app to React Native
- Implemented React Navigation with Bottom Tabs

### v2.0.0 - Expo Router Migration
- Migrated to Expo Router for file-based routing
- Created `app/` directory structure
- Implemented layout groups with `(tabs)`
- Removed manual React Navigation setup

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
- [ ] Add stack navigation for detail screens
- [ ] Implement search functionality

## License

Private

## Version

2.0.0 - Expo Router with File-Based Routing
