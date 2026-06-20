
## Heritage-Road
국가유산과 주변 관광지 정보를 탐색할 수 있는 문화여행 앱입니다.


## System Requirements
- Node.js >= 18
- macOS, Windows (including WSL), and Linux are supported.

## Installation
1. Clone the repository:
````bash
git clone https://github.com/KOOONT/HeritageRoad-Frontend.git
````
2. Install dependencies:
````bash
npm install
````

3. Create a .env File:

    In the root directory of your project, create a .env file.
    Define the necessary environment variables in this file.

````bash
EXPO_PUBLIC_API_BASE_URL=https://api.heritageload.store
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
EXPO_UPDATES_URL=https://u.expo.dev/39274d17-3163-486f-b2fd-036c76303eb0
````

4. Set Up Development Environment:

    Configure your development environment with Android and iOS devices. This includes setting up Android Emulators, iOS Simulators, and real devices.
    For detailed instructions, refer to the [Expo documentation on setting up your environment for development builds](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local&platform=android&device=physical).
    
5. Run your app:
   This command runs a development server after building your app. On subsequent runs, you can skip running `npx expo start`.

````bash
# For Android
npx expo run:android
# For iOS
npx expo run:ios
````

## Deployment

The production API is served through Nginx at:

````bash
https://api.heritageload.store
````

Create the production EAS environment variables before building:

````bash
npx eas-cli@latest env:create --name EXPO_PUBLIC_API_BASE_URL --value https://api.heritageload.store --environment production --visibility plaintext
npx eas-cli@latest env:create --name GOOGLE_MAPS_API_KEY --value "your_google_maps_api_key" --environment production --visibility sensitive
npx eas-cli@latest env:create --name EXPO_UPDATES_URL --value https://u.expo.dev/39274d17-3163-486f-b2fd-036c76303eb0 --environment production --visibility plaintext
````

Build a tester Android binary:

````bash
npx eas-cli@latest build --platform android --profile preview
````

Build and submit a store release:

````bash
npx eas-cli@latest build --platform android --profile production
npx eas-cli@latest submit --platform android --profile production
````

## References

- [Expo Documentation](https://docs.expo.dev/get-started/introduction/)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps) - React Native Mapview component for iOS + Android
  
