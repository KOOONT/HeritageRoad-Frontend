
## Heritage-Road
Korean Heritage Guide App for Domestic and International Travelers

## System Requirements
- Node.js (LTS).
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

3. Set up environment variables:

- Create a '.env' file in the root directory of the project and set the necessary environment variables.
- Set up an Android and iOS device(Android Emulator, iOS Simulator and real device) with a development build:
  https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local&platform=android&device=physical

4. Run your app:
````bash
# For Android
npx expo run:android
# For iOS
npx expo run:ios
````
This command runs a development server after building your app. On subsequent runs, you can skip running `npx expo start`.


## References

- [Expo Documentation](https://docs.expo.dev/get-started/introduction/)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps) - React Native Mapview component for iOS + Android
  
