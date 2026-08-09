# Healthcare App (React Native + Expo)

A mobile healthcare UI built with **React Native** and **Expo**, matching the design with dummy data for doctors, appointments, and care services.

## Prerequisites

Install these before running the app:

1. **Node.js 18+** — [https://nodejs.org](https://nodejs.org)
2. **VS Code** — [https://code.visualstudio.com](https://code.visualstudio.com)
3. **Expo Go** on your phone (optional, for device testing)
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

For iOS Simulator (Mac only): install **Xcode** from the App Store.

For Android Emulator: install **Android Studio**.

## Setup in VS Code

### 1. Open the project

```bash
cd ~/Projects/healthcare-app
code .
```

### 2. Install recommended VS Code extensions

- **Expo Tools** (`expo.vscode-expo-tools`)
- **React Native Tools** (`msjsdiag.vscode-react-native`)
- **ES7+ React/Redux/React-Native snippets** (optional)

### 3. Install dependencies

Open the integrated terminal in VS Code (`Ctrl+`` ` or `View → Terminal`) and run:

```bash
npm install
```

## How to Run

Start the Expo dev server:

```bash
npm start
```

Then choose how to preview:

| Option | How |
|--------|-----|
| **Phone (Expo Go)** | Scan the QR code shown in the terminal with your camera (iOS) or Expo Go (Android) |
| **iOS Simulator** | Press `i` in the terminal (Mac + Xcode required) |
| **Android Emulator** | Press `a` in the terminal (Android Studio required) |
| **Web preview** | Press `w` in the terminal |

Or run directly:

```bash
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Browser preview
```

## Project Structure

```
healthcare-app/
├── App.tsx                 # Root app + bottom tab navigation
├── src/
│   ├── data/
│   │   └── dummyData.ts    # All dummy data (user, doctors, appointments)
│   ├── theme/
│   │   └── colors.ts       # Colors and spacing
│   ├── components/         # UI components
│   └── screens/
│       └── HomeScreen.tsx  # Main home screen
└── package.json
```

## Dummy Data

All sample data lives in `src/data/dummyData.ts`:

- **User:** `pravin av` in `Tambaram`
- **Upcoming appointment:** Dr. Priya Menon, Tue 05 Jun 2024, Token #07
- **Doctors:** Dr. Arun Kumar, Dr. Priya Menon (₹20 consultation)
- **Care services:** Nursing Care, Elder Care, Physiotherapy, Lab Tests

Edit that file to change names, dates, doctors, or services.

## Screens Included

- **Home** — Full UI from the design (header, banner, quick links, appointment card, services, doctor list)
- **Services / Appointment / Profile** — Placeholder screens (bottom tabs work)

## Troubleshooting

- **`command not found: npm`** — Install Node.js and restart VS Code.
- **Metro bundler cache issues** — Run `npx expo start -c` to clear cache.
- **Simulator not opening** — Ensure Xcode (iOS) or Android Studio is installed and configured.
