
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Tajawal-Regular": require("../assets/fonts/Tajawal-Regular.ttf"),
    "Tajawal-Medium": require("../assets/fonts/Tajawal-Medium.ttf"),
    "Tajawal-Bold": require("../assets/fonts/Tajawal-Bold.ttf"),
    Uthmanic: require("../assets/fonts/UthmanicHafs.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (error) {
    throw error;
  }

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
