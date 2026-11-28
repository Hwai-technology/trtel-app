import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { router, type Href } from "expo-router";
import { Heart, Bookmark, ArrowUpDown } from "lucide-react-native";

import { THEME } from "@/constants/theme";
import { countLabel } from "@/utils/arabic";
import { useSavedVerses } from "@/context/SavedVersesContext";
import AppBar from "@/components/ui/AppBar";
import SavedVerseCard from "./(tabs)/quran/SavedVerseCard";


const BROWN = "#8A5A24";

export default function SavedVersesScreen() {
  const insets = useSafeAreaInsets();
  const { savedVerses, removeSaved } = useSavedVerses();

  const [newestFirst, setNewestFirst] = useState(true);
  const [menuId, setMenuId] = useState<string | null>(null);

  // المخزن مرتّب من الأحدث، فللأقدم بنعكسه
  const data = newestFirst ? savedVerses : [...savedVerses].reverse();

  const header = (
    <View style={styles.header}>
      <View style={styles.banner}>
        <View style={styles.bannerIcon}>
          <Heart size={22} color={BROWN} fill={BROWN} />
        </View>

        <View style={styles.bannerTexts}>
          <Text style={styles.bannerTitle}>ملاذ الروح والتدبّر</Text>
          <Text style={styles.bannerText}>
            مجموعتك الخاصة من الآيات القرآنية التي لامست قلبك واستوقفت تدبرك
            لتفيء إليها حيناً بعد حين.
          </Text>
        </View>
      </View>

      <View style={styles.toolbar}>
        <View style={styles.countChip}>
          <Bookmark
            size={12}
            color={THEME.colors.primary}
            fill={THEME.colors.primary}
          />
          <Text style={styles.countText}>
            {countLabel(savedVerses.length, {
              one: "آية محفوظة",
              two: "آيتان محفوظتان",
              few: "آيات محفوظة",
              many: "آية محفوظة",
            })}
          </Text>
        </View>

        <Pressable
          style={styles.sort}
          onPress={() => setNewestFirst((v) => !v)}
        >
          <Text style={styles.sortText}>
            {newestFirst ? "مرتبة حسب الأحدث حفظاً" : "مرتبة حسب الأقدم حفظاً"}
          </Text>
          <ArrowUpDown size={14} color={THEME.colors.textSecondary} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <AppBar
        title="الآيات المحفوظة"
        subtitle="آيات اخترت الاحتفاظ بها"
        onBack={() => router.back()}
        logo={
          <Image
            source={require("../assets/images/trtel_logo (1).png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        }
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SavedVerseCard
            verse={item}
            menuOpen={menuId === item.id}
            onToggleMenu={() =>
              setMenuId((cur) => (cur === item.id ? null : item.id))
            }
            onRemove={() => {
              setMenuId(null);
              removeSaved(item.id);
            }}
            onPlay={() => console.log("play", item.surahId, item.ayahNumber)}
            onOpenInMushaf={() => router.push(`/quran/${item.page}` as Href)}
          />
        )}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <Text style={styles.empty}>
            لا توجد آيات محفوظة بعد. اضغطي على آية ثم على القلب أعلى القائمة.
          </Text>
        }
        onScrollBeginDrag={() => setMenuId(null)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    gap: 16,
    marginBottom: 16,
  },

  banner: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F5E6C4",
  },
  bannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EBCF92",
  },
  bannerTexts: {
    flex: 1,
    alignItems: "flex-end",
    gap: 4,
  },
  bannerTitle: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 14,
    color: BROWN,
  },
  bannerText: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 12,
    lineHeight: 20,
    color: "#8A6B3A",
    textAlign: "right",
  },

  toolbar: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countChip: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#E4F2EE",
  },
  countText: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 12,
    color: THEME.colors.primary,
  },
  sort: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
  },
  sortText: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },

  empty: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 14,
    lineHeight: 24,
    color: THEME.colors.textSecondary,
    textAlign: "center",
    paddingVertical: 32,
  },
});
