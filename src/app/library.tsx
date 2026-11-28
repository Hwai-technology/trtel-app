import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router, type Href } from "expo-router";
import { Bookmark, Heart, PenLine, History, BookmarkCheck, BookOpen } from "lucide-react-native";

import { THEME } from "@/constants/theme";
import { countLabel } from "@/utils/arabic";
import { toArabicDigits } from "@/utils/arabic";
import { useBookmarks } from "@/context/BookmarksContext";
import { useSavedVerses } from "@/context/SavedVersesContext";
import { useNotes } from "@/context/NotesContext";
import AppBar from "@/components/ui/AppBar";
import LibraryCard from "@/components/quran/LibraryCard";
import LibrarySectionCard from "./(tabs)/quran/LibrarySectionCard";


const BROWN = "#8A5A24";

export default function LibraryScreen() {
  const insets = useSafeAreaInsets();
  const { bookmarks } = useBookmarks();
  const { savedVerses } = useSavedVerses();
  const { notes } = useNotes();

  // الأحدث بكل مخزن هو أول عنصر
  const lastBookmark = bookmarks[0];
  const lastSaved = savedVerses[0];
  const lastNote = notes[0];

  const go = (path: string) => router.push(path as Href);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <AppBar
        title="مكتبتي القرآنية"
        onBack={() => router.back()}
        logo={
          <Image
            source={require("../assets/images/trtel_logo (1).png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
      >
        <LibraryCard
          hideHeader
          bookmarks={bookmarks.length}
          savedVerses={savedVerses.length}
          notes={notes.length}
          onBookmarksPress={() => go("/bookmarks")}
          onSavedPress={() => go("/saved")}
          onNotesPress={() => go("/notes")}
        />

        <LibrarySectionCard
          icon={<Bookmark size={20} color={BROWN} fill={BROWN} />}
          iconTint="#FBEBD3"
          title="العلامات المرجعية"
          badge={countLabel(bookmarks.length, {
            one: "موضع واحد",
            two: "موضعان",
            few: "مواضع",
            many: "موضعاً",
          })}
          badgeTint="#F5DCA8"
          badgeColor={BROWN}
          subtitle="مواضع القراءة التي أردت العودة إليها"
          footerIcon={<History size={14} color={THEME.colors.textSecondary} />}
          footerText={
            lastBookmark
              ? `آخر موضع: سورة ${lastBookmark.surahName} · ص ${toArabicDigits(lastBookmark.page)}`
              : "لا توجد علامات بعد"
          }
          onPress={() => go("/bookmarks")}
        />

        <LibrarySectionCard
          icon={<Heart size={20} color={THEME.colors.primary} fill={THEME.colors.primary} />}
          iconTint="#CDF5EA"
          title="الآيات المحفوظة"
          badge={countLabel(savedVerses.length, {
            one: "آية واحدة",
            two: "آيتان",
            few: "آيات",
            many: "آية",
          })}
          badgeTint="#D8F3EA"
          badgeColor={THEME.colors.primary}
          subtitle="الآيات التي اخترت الاحتفاظ بها بقلبك"
          footerIcon={<BookmarkCheck size={14} color={THEME.colors.textSecondary} />}
          footerText={
            lastSaved
              ? `آخر حفظ: سورة ${lastSaved.surahName} · آية ${toArabicDigits(lastSaved.ayahNumber)}`
              : "لا توجد آيات محفوظة بعد"
          }
          onPress={() => go("/saved")}
        />

        <LibrarySectionCard
          icon={<PenLine size={20} color="#8B3A2E" />}
          iconTint="#E8E6DF"
          title="ملاحظاتي وتدبّري"
          badge={countLabel(notes.length, {
            one: "خاطرة واحدة",
            two: "خاطرتان",
            few: "خواطر",
            many: "خاطرة",
          })}
          badgeTint="#E8E6DF"
          badgeColor={THEME.colors.textSecondary}
          subtitle="تأملاتك وملاحظاتك المرتبطة بآيات الوحي"
          footerIcon={<PenLine size={14} color={THEME.colors.textSecondary} />}
          footerText={
            lastNote
              ? `آخر تدوين: سورة ${lastNote.surahName} · آية ${toArabicDigits(lastNote.ayahNumber)}`
              : "لا توجد ملاحظات بعد"
          }
          onPress={() => go("/notes")}
        />

        {/* بطاقة ختامية ثابتة */}
        <View style={styles.quoteCard}>
          <View style={styles.quoteIcon}>
            <BookOpen size={20} color={BROWN} />
          </View>

          <View style={styles.quoteTexts}>
            <Text style={styles.quoteVerse}>«وَرَتِّلِ ٱلْقُرْآنَ تَرْتِيلًا»</Text>
            <Text style={styles.quoteSubtitle}>
              مستودعك الهادئ لتدبّر آيات الذكر الحكيم والعيش معها
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 16,
  },
  quoteCard: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    ...THEME.shadows.small,
  },
  quoteIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBEBD3",
  },
  quoteTexts: {
    flex: 1,
    alignItems: "flex-end",
    gap: 4,
  },
  quoteVerse: {
    fontFamily: THEME.typography.fontFamily.quran,
    fontSize: 16,
    color: THEME.colors.primary,
    textAlign: "right",
  },
  quoteSubtitle: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 12,
    color: THEME.colors.textSecondary,
    textAlign: "right",
  },
});