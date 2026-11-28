import { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router, type Href } from "expo-router";
import { Bookmark } from "lucide-react-native";

import { THEME } from "@/constants/theme";
import { countLabel } from "@/utils/arabic";
import { useBookmarks } from "@/context/BookmarksContext";
import AppBar from "@/components/ui/AppBar";
import BookmarkCard from "@/components/quran/BookmarkCard";

const BROWN = "#8A5A24";

export default function BookmarksScreen() {
  const insets = useSafeAreaInsets();
  const { bookmarks, removeBookmark } = useBookmarks();

  const [menuId, setMenuId] = useState<string | null>(null);

  const header = (
    <View style={styles.header}>
      <View style={styles.toolbar}>
        <View style={styles.countRow}>
          <Bookmark size={16} color={BROWN} fill={BROWN} />
          <Text style={styles.countText}>
            {countLabel(bookmarks.length, {
              one: "علامة مرجعية واحدة",
              two: "علامتان مرجعيتان",
              few: "علامات مرجعية",
              many: "علامة مرجعية",
            })}
          </Text>
        </View>

        <View style={styles.autoChip}>
          <View style={styles.autoDot} />
          <Text style={styles.autoText}>تحديث تلقائي للمصحف</Text>
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.infoIcon}>
          <Bookmark size={18} color={BROWN} fill={BROWN} />
        </View>

        <Text style={styles.infoText}>
          تتيح لك العلامات المرجعية الرجوع السريع لموضع توقفك الأخير في المصحف
          الشريف لمواصلة تلاوتك بسكينة.
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <AppBar
        title="العلامات المرجعية"
        subtitle="مواضع القراءة التي حفظتها"
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
        data={bookmarks}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <BookmarkCard
            bookmark={item}
            isLast={index === 0}
            menuOpen={menuId === item.id}
            onToggleMenu={() => setMenuId((cur) => (cur === item.id ? null : item.id))}
            onRemove={() => {
              setMenuId(null);
              removeBookmark(item.id);
            }}
            onOpen={() => router.push(`/quran/${item.page}` as Href)}
          />
        )}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <Text style={styles.empty}>
            لا توجد علامات بعد. اضغطي على آية في المصحف ثم «علامة مرجعية».
          </Text>
        }
        onScrollBeginDrag={() => setMenuId(null)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
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

  toolbar: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  countText: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 13,
    color: THEME.colors.text,
  },
  autoChip: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#F5DCA8",
  },
  autoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BROWN,
  },
  autoText: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 11,
    color: BROWN,
  },

  info: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    ...THEME.shadows.small,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFE6D2",
  },
  infoText: {
    flex: 1,
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 12,
    lineHeight: 22,
    color: THEME.colors.textSecondary,
    textAlign: "right",
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