import { useEffect } from "react";
import { Stack } from "expo-router";
import { SavedVersesProvider } from "@/context/SavedVersesContext";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NotesProvider } from "@/context/NotesContext";
import { THEME } from "@/constants/theme";
import AppProviders from "@/components/AppProviders";
import { BookmarksProvider } from "@/context/BookmarksContext";

void SplashScreen.preventAutoHideAsync();

// مؤقتاً: false = بيفتح على اللوغ إن، true = بيفتح على التابات
// لاحقاً منبدلها بحالة تسجيل الدخول الحقيقية
const isLoggedIn = true;

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Tajawal-Regular": require("../assets/fonts/Tajawal-Regular.ttf"),
    "Tajawal-Medium": require("../assets/fonts/Tajawal-Medium.ttf"),
    "Tajawal-Bold": require("../assets/fonts/Tajawal-Bold.ttf"),
    Uthmanic: require("../assets/fonts/UthmanicHafs.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (error) {
    throw error;
  }

  if (!loaded) {
    return null;
  }
  return (
    <AppProviders>
      <StatusBar style="auto" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: THEME.colors.background,
          },
        }}
      >
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="notes" />
        </Stack.Protected>

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </AppProviders>
  );
}
