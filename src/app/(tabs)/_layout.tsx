import { View } from "react-native";
import { Tabs } from "expo-router";
import { router, type Href } from "expo-router";

import AppBottomNav, { type NavTab } from "@/components/ui/AppBottomNav";
import { THEME } from "@/constants/theme";

// اسم الملف ↔ اسم التاب
const ROUTE_TO_TAB: Record<string, NavTab> = {
  index: "home",
  quran: "quran",
  azkar: "azkar",
  circles: "circles",
  more: "more",
};

// اسم التاب ← الرابط (للانتقال)
const TAB_TO_PATH: Record<NavTab, string> = {
  home: "/",
  quran: "/quran",
  azkar: "/azkar",
  circles: "/circles",
  more: "/more",
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: THEME.colors.background },
      }}
      tabBar={({ state }) => {
        const activeTab =
          ROUTE_TO_TAB[state.routes[state.index].name] ?? "home";

        return (
          <View
            pointerEvents="box-none"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              paddingHorizontal: THEME.spacing.xxl,
            }}
          >
            <AppBottomNav
              activeTab={activeTab}
              onTabPress={(tab) => router.navigate(TAB_TO_PATH[tab] as Href)}
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
  );
}
