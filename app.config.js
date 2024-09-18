export default {
  "expo": {
    "name": "heritage-road",
    "slug": "heritage-road",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "userInterfaceStyle": "automatic",
    "ios": {
      "infoPlist": {
        "NSAppTransportSecurity": { 
          "NSAllowsArbitraryLoads": true 
        }
      },
      "userInterfaceStyle": "automatic",
      "supportsTablet": true,
      "bundleIdentifier": "com.anonymous.heritage-road",
      "config": {
        "googleMapsApiKey": process.env.GOOGLE_MAPS_API_KEY
      }
    },
    "android": {
      "usesCleartextTraffic": true,
      "userInterfaceStyle": "automatic",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.anonymous.heritageroad",
      "config": {
        "googleMaps": {
          "apiKey": process.env.GOOGLE_MAPS_API_KEY
        }
      }
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      "expo-router"
    ],
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "scheme": "heritage-road",
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "39274d17-3163-486f-b2fd-036c76303eb0"
      }
    }
  }
}
