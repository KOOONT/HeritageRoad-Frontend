export default {
  "expo": {
    "name": "Heritage Road",
    "slug": "heritage-road",
    "description": "국가유산과 주변 관광지 정보를 탐색할 수 있는 문화 여행 앱입니다.",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#03CBDD"
    },
    "updates": {
      "url": process.env.EXPO_UPDATES_URL
    },
    "runtimeVersion": {
      "policy": "appVersion" // 런타임 버전 정책 설정
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
      "package": "com.kooont.heritageroad",
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
      "expo-router",
      "expo-av",
      ["expo-build-properties", {
        "android": {
          "usesCleartextTraffic": true
        }
      }]
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
        "projectId": "39274d17-3163-486f-b2fd-036c76303eb0",
      },
      "GOOGLE_MAPS_API_KEY": process.env.GOOGLE_MAPS_API_KEY,
      "API_BASE_URL": process.env.API_BASE_URL
    }
  }
}
