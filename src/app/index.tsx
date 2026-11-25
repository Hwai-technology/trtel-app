import { View, Text, StyleSheet, Alert } from "react-native";
import { THEME } from "../constants/theme";
import AppButton from "../components/ui/AppButton";
import { useState } from "react";
import AppCard, { AppCardContent } from "../components/ui/AppCard";
import AppDropdown from "../components/ui/AppDropdown";
import AppInput from "../components/ui/AppInput";
import { Search } from "lucide-react-native";
import AppBar from "../components/ui/AppBar";
import { Image } from "react-native";
import AppBottomNav from "../components/ui/AppBottomNav";

import AppFilterTabs from "../components/ui/AppFilterTabs";
import AppTasbeehCounter from "@/components/ui/AppTasbeehCounter";
import AppAzkarCard from "@/components/ui/AppAzkarCard";

export default function HomeRoute() {
  const [pressed, setPressed] = useState(false);
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [activeFilter, setActiveFilter] = useState("font");

  const filterOptions = [
    { label: "القراءة العادية", value: "reading" },
    { label: "ضبط الخط", value: "font" },
    { label: "الاستماع للآية", value: "audio" },
    { label: "مكتبتي القرآنية", value: "library" },
  ];
  return (
    <View style={styles.container}>
      <AppBar
        title="الأذكار والأدعية"
        onBack={() => {}}
        logo={
          <Image
            source={require("../assets/images/trtel_logo (1).png")}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="contain"
          />
        }
      />

      <View style={styles.content}>
        <AppFilterTabs
          options={filterOptions}
          value={activeFilter}
          onChange={setActiveFilter}
        />
        <AppTasbeehCounter />

        <AppAzkarCard text="سُبْحَانَ اللَّهِ وَبِحَمْدِهِ" repetitions={3} />
        {/* <AppInput
          value={name}
          onChangeText={setName}
          placeholder="أدخل اسمك"
          icon={<Search size={20} color="#52615D" />}
        /> */}
        {/* 
        <AppDropdown
          value={selectedRole}
          onSelect={setSelectedRole}
          placeholder="اختر نوع الحساب"
          options={[
            { label: "طالب", value: "student" },
            { label: "معلم", value: "teacher" },
            { label: "زائر", value: "guest" },
          ]}
        /> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    justifyContent: "flex-start",
    alignItems: "stretch",
    // padding: THEME.spacing.xxl,
  },

  content: {
    flex: 1,
    padding: THEME.spacing.xxl,
  },
  title: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: THEME.typography.fontSize.display,
    color: THEME.colors.primary,
    textAlign: "right",
    writingDirection: "rtl",
  },

  regular: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: THEME.typography.fontSize.md,
    color: THEME.colors.text,
    textAlign: "right",
  },

  medium: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: THEME.typography.fontSize.lg,
    color: THEME.colors.primary,
    textAlign: "right",
  },

  bold: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: THEME.typography.fontSize.xl,
    color: THEME.colors.text,
    textAlign: "right",
  },

  quran: {
    fontFamily: THEME.typography.fontFamily.quran,
    fontSize: THEME.typography.fontSize.xxl,
    color: THEME.colors.primary,
    textAlign: "right",
  },
});
