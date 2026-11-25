import { useEffect } from "react";
import { Tabs, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { I18nManager, View } from "react-native";
import AppBottomNav from "../components/ui/AppBottomNav";
import { THEME } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

void SplashScreen.preventAutoHideAsync();

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
export default function RootLayout() {
  const insets = useSafeAreaInsets();
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

      <Tabs
        screenOptions={{
          headerShown: false,
          // tabBarStyle: {
          //   position: "absolute",
          //   backgroundColor: "transparent",
          //   borderTopWidth: 0,
          //   elevation: 0,
          //   shadowColor: "transparent",
          //   shadowOpacity: 0,
          //   shadowRadius: 0,
          //   height: 64,
          // },
          sceneStyle: {
            backgroundColor: THEME.colors.background,
          },
        }}
        tabBar={({ state }) => {
          const currentRoute = state.routes[state.index].name;

          const activeTab = currentRoute === "index" ? "home" : currentRoute;

          return (
            <View
              pointerEvents="box-none"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                paddingHorizontal: THEME.spacing.xxl,
                backgroundColor: "transparent",
              }}
            >
              <AppBottomNav
                activeTab={
                  activeTab as "home" | "quran" | "azkar" | "circles" | "more"
                }
                onTabPress={(tab) =>
                  router.navigate(tab === "home" ? "/" : `/${tab}`)
                }
              />
            </View>
          );
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="quran" />
        <Tabs.Screen name="azkar" />
        <Tabs.Screen name="circles" />
        <Tabs.Screen name="more" />
      </Tabs>
    </>
  );
}
