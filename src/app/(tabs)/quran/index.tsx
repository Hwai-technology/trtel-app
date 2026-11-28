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
import { Search, List, LayoutGrid } from "lucide-react-native";

import { THEME } from "@/constants/theme";
import { SURAHS, TOTAL_SURAHS } from "@/constants/surahs";
import { toArabicDigits, toEnglishDigits } from "@/utils/arabic";
import AppBar from "@/components/ui/AppBar";
import AppInput from "@/components/ui/AppInput";
import AppFilterTabs from "@/components/ui/AppFilterTabs";
import LastReadingCard from "@/components/quran/LastReadingCard";
import LibraryCard from "@/components/quran/LibraryCard";
import SurahListItem from "@/components/quran/SurahListItem";
import { useNotes } from "@/context/NotesContext";
import { useBookmarks } from "@/context/BookmarksContext";
import { useSavedVerses } from "@/context/SavedVersesContext";
// ارتفاع الشريط السفلي، عشان آخر المحتوى ما يتغطى
const TAB_BAR_HEIGHT = 64;

const FILTER_OPTIONS = [
  { label: "الكل (١١٤)", value: "all" },
  { label: "مكية (٨٦)", value: "makki" },
  { label: "مدنية (٢٨)", value: "madani" },
  { label: "☆ المفضلة", value: "favorites" },
];

// بيانات مؤقتة، لاحقاً بتجي من التخزين أو الـ API
const LAST_READING = {
  surahName: "سورة البقرة",
  details: "آية ٢٥٥ (آية الكرسي) • ص ٤٢ • الجزء ٣",
  progress: 68,
  timeAgo: "منذ ساعتين",
};

export default function QuranScreen() {
  const insets = useSafeAreaInsets();
  const { notes } = useNotes();
  const { bookmarks, removeBookmark } = useBookmarks();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const { savedVerses, isSaved, toggleSaved } = useSavedVerses();

  // السور اللي بتظهر: بتمرّ على الفلتر وعلى البحث
  const visibleSurahs = SURAHS.filter((surah) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "favorites"
        ? Boolean(surah.isFavorite)
        : surah.type === filter);

    const text = query.trim();
    const matchesQuery =
      text === "" ||
      surah.name.includes(text) ||
      String(surah.id) === toEnglishDigits(text);

    return matchesFilter && matchesQuery;
  });

  const header = (
    <View style={styles.header}>
      <LastReadingCard
        {...LAST_READING}
        onContinue={() => {}}
        onPlay={() => {}}
      />

      <LibraryCard
        bookmarks={bookmarks.length}
        savedVerses={savedVerses.length}
        notes={notes.length}
        onPress={() => router.push("/library" as Href)}
        onBookmarksPress={() => router.push("/bookmarks" as Href)}
        onSavedPress={() => router.push("/saved" as Href)}
        onNotesPress={() => router.push("/notes" as Href)}
      />
      <AppInput
        value={query}
        onChangeText={setQuery}
        placeholder="ابحث باسم السورة أو رقمها (مثال: الكهف، ١٨)..."
        icon={<Search size={20} color={THEME.colors.textSecondary} />}
      />

      <AppFilterTabs
        options={FILTER_OPTIONS}
        value={filter}
        onChange={setFilter}
      />

      <View style={styles.indexHeader}>
        <View style={styles.indexTitleRow}>
          <Text style={styles.indexTitle}>فهرس السور</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {toArabicDigits(TOTAL_SURAHS)} سورة
            </Text>
          </View>
        </View>

        <View style={styles.viewToggle}>
          <Pressable
            onPress={() => setViewMode("list")}
            style={[
              styles.toggleButton,
              viewMode === "list" && styles.toggleActive,
            ]}
          >
            <List size={16} color={THEME.colors.text} />
          </Pressable>
          <Pressable
            onPress={() => setViewMode("grid")}
            style={[
              styles.toggleButton,
              viewMode === "grid" && styles.toggleActive,
            ]}
          >
            <LayoutGrid size={16} color={THEME.colors.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <AppBar
        title="القرآن الكريم"
        onBack={() => router.navigate("/" as Href)}
        logo={
          <Image
            source={require("../../../assets/images/trtel_logo (1).png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        }
      />

      <FlatList
        data={visibleSurahs}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <SurahListItem
            surah={item}
            onPress={() => {
              router.push(`/quran/${item.page}` as Href);
            }}
            onPlayAudio={() => {}}
          />
        )}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <Text style={styles.empty}>لا توجد نتائج مطابقة</Text>
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 24 },
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

  indexHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  indexTitleRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
  },
  indexTitle: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 18,
    color: THEME.colors.text,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "#ECE9DF",
  },
  countText: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },

  viewToggle: {
    flexDirection: "row",
    padding: 3,
    borderRadius: 10,
    backgroundColor: "#ECE9DF",
  },
  toggleButton: {
    width: 30,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleActive: {
    backgroundColor: "#FFFFFF",
  },

  empty: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 14,
    color: THEME.colors.textSecondary,
    textAlign: "center",
    paddingVertical: 32,
  },
});
