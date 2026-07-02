const easProjectId = process.env.EXPO_PROJECT_ID ?? "49fc3654-e353-4499-887a-244cb11e11ff";
const updatesUrl = process.env.EXPO_UPDATES_URL ?? `https://u.expo.dev/${easProjectId}`;

export default {
  expo: {
    name: "Heritage Road",
    slug: "heritage-road",
    description: "국가유산과 주변 관광지, 음식점, 숙박 정보를 함께 탐색할 수 있는 문화 여행 앱입니다.",
    sdkVersion: "51.0.0",
    version: "1.0.2",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#03CBDD",
    },
    ...(updatesUrl
      ? {
          updates: {
            url: updatesUrl,
          },
          runtimeVersion: {
            policy: "appVersion",
          },
        }
      : {}),
    userInterfaceStyle: "automatic",
    ios: {
      userInterfaceStyle: "automatic",
      supportsTablet: false,
      bundleIdentifier: "com.kooont.heritageroad",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      userInterfaceStyle: "automatic",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.kooont.heritageroad",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro",
    },
    plugins: [
      "expo-router",
      ["expo-av", {
        microphonePermission: false,
      }],
    ],
    platforms: [
      "ios",
      "android",
      "web",
    ],
    scheme: "heritage-road",
    extra: {
      router: {
        origin: false,
      },
      ...(easProjectId
        ? {
            eas: {
              projectId: easProjectId,
            },
          }
        : {}),
      API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
    },
  },
};
