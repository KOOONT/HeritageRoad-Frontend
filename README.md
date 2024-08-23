
## Heritage-Road
Korean Heritage Guide App for Domestic and International Travelers

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

## References

- [Expo Documentation](https://docs.expo.dev/get-started/introduction/)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps) - React Native Mapview component for iOS + Android
  
