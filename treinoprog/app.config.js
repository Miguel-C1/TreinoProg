export default {
    expo: {
      name: "treinoprog3",
      slug: "treinoprog3",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "myapp",
      userInterfaceStyle: "automatic",
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      ios: {
        supportsTablet: true
      },
      android: {
        permissions: [
          "INTERNET",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.ACCESS_MEDIA_LOCATION"
        ],
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#ffffff"
        },
        package: "com.anonymous.treinoprog3"
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png"
      },
      plugins: [
        "expo-router",
        [
          "expo-media-library",
          {
            photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
            savePhotosPermission: "Allow $(PRODUCT_NAME) to save photos.",
            isAccessMediaLocationEnabled: true
          }
        ],
        [
          "expo-build-properties",
          {
            android: {
              compileSdkVersion: 33,
              targetSdkVersion: 33,
              minSdkVersion: 21,
              buildToolsVersion: "33.0.0",
              manifest: {
                usesCleartextTraffic: true
              }
            }
          }
        ]
      ],
      experiments: {
        typedRoutes: true
      }
    }
  };
  