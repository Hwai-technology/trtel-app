import { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useSavedVerses } from "@/context/SavedVersesContext";
import { THEME } from "@/constants/theme";
import { SURAHS } from "@/constants/surahs";
import { getMushafPage, type Ayah } from "@/constants/mushaf";
import { getTafsir, TAFSIR_SOURCE_NAME } from "@/constants/tafsir";
import { toArabicDigits, versesLabel } from "@/utils/arabic";
import { useNotes } from "@/context/NotesContext";
import { useBookmarks } from "@/context/BookmarksContext";
import { useSettings } from "@/context/SettingsContext";
import AppBar from "@/components/ui/AppBar";
import AppBottomSheet from "@/components/ui/AppBottomSheet";
import AppFilterTabs from "@/components/ui/AppFilterTabs";
import type { QuickActionId } from "@/components/ui/AppQuickActions";
import AyahSheetContent from "@/components/quran/AyahSheetContent";
import AddNoteModal from "@/components/quran/AddNoteModal";
import TafsirModal from "@/components/quran/TafsirModal";
import FontSettingsModal from "@/components/quran/FontSettingsModal";
import MushafPageStrip from "@/components/quran/MushafPageStrip";

const TAB_BAR_HEIGHT = 64;
const GOLD = "#B39A5E";
const AYAH_HIGHLIGHT = "rgba(126, 214, 195, 0.22)";

// نسبة ارتفاع السطر لحجم الخط (٥٦ ÷ ٢٤)
const LINE_HEIGHT_RATIO = 2.33;

// أي نافذة مفتوحة
type Panel = "none" | "sheet" | "note" | "tafsir" | "font";
const PANEL_SWITCH_DELAY = 350;

const READING_TABS = [
  { label: "القراءة العادية", value: "reading" },
  { label: "ضبط الخط", value: "font" },
  { label: "الاستماع للآية", value: "audio" },
  { label: "مكتبتي القرآنية", value: "library" },
];

const ayahKey = (ayah: Ayah) => `${ayah.surahId}-${ayah.number}`;

const logo = (
  <Image
    source={require("../../../assets/images/trtel_logo (1).png")}
    style={{ width: "100%", height: "100%" }}
    resizeMode="contain"
  />
);

export default function MushafPageScreen() {
  const insets = useSafeAreaInsets();
  const { page } = useLocalSearchParams<{ page: string }>();
  const { savedVerses, isSaved, toggleSaved } = useSavedVerses();
  const { addNote } = useNotes();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { fontSize, setFontSize } = useSettings();

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [ayahActive, setAyahActive] = useState(false);
  const [panel, setPanel] = useState<Panel>("none");
  // حجم الخط أثناء المعاينة (null = ما في معاينة)
  const [previewFontSize, setPreviewFontSize] = useState<number | null>(null);

  const pageNumber = Number(page);
  const mushafPage = getMushafPage(pageNumber);
  const surah = SURAHS.find((s) => s.id === mushafPage?.surahId);

  if (!mushafPage || !surah) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <AppBar title="المصحف" onBack={() => router.back()} logo={logo} />
        <Text style={styles.empty}>هذه الصفحة غير متوفرة بعد</Text>
      </SafeAreaView>
    );
  }

  const pageLabel = toArabicDigits(pageNumber);
  const surahType = surah.type === "makki" ? "مكية" : "مدنية";

  const effectiveFontSize = previewFontSize ?? fontSize;
  const pageHasBookmark = mushafPage.ayahs.some((a) =>
    isBookmarked(a.surahId, a.number),
  );

  const selectedAyah = mushafPage.ayahs.find(
    (ayah) => ayahKey(ayah) === selectedKey,
  );
  const selectedSurahName =
    SURAHS.find((s) => s.id === selectedAyah?.surahId)?.name ?? surah.name;

  const handleAyahPress = (ayah: Ayah) => {
    setSelectedKey(ayahKey(ayah));
    setAyahActive(true);
    setPanel("sheet");
  };

  // بيسكّر أي نافذة، وبيشيل لون الآية، وبيلغي معاينة الخط
  const closePanel = () => {
    setPanel("none");
    setAyahActive(false);
    setPreviewFontSize(null);
  };

  // سكّري الـ Sheet أول، وبعدها افتحي النافذة الجاية
  const openAfterSheet = (next: Panel) => {
    setPanel("none");
    setTimeout(() => setPanel(next), PANEL_SWITCH_DELAY);
  };

  const handleQuickAction = (action: QuickActionId) => {
    if (!selectedAyah) return;

    switch (action) {
      case "font":
        // نشيل لون الآية عشان نشوف تغيّر الحجم بوضوح
        setAyahActive(false);
        setPreviewFontSize(fontSize);
        openAfterSheet("font");
        return;

      case "note":
        openAfterSheet("note");
        return;

      case "tafsir":
        openAfterSheet("tafsir");
        return;

      case "bookmark":
        toggleBookmark({
          surahId: selectedAyah.surahId,
          surahName: selectedSurahName,
          ayahNumber: selectedAyah.number,
          ayahText: selectedAyah.text,
          page: pageNumber,
          juz: mushafPage.juz,
          hizb: mushafPage.hizb, // ← جديد
          quarter: mushafPage.quarter,
        });
        closePanel();
        return;

      default:
        // TODO: "حفظ الآية" لاحقاً
        console.log(action, selectedAyah.surahId, selectedAyah.number);
    }
  };

  const handleSaveNote = (text: string) => {
    if (!selectedAyah) return;

    addNote({
      surahId: selectedAyah.surahId,
      surahName: selectedSurahName,
      ayahNumber: selectedAyah.number,
      ayahText: selectedAyah.text,
      page: pageNumber,
      juz: mushafPage.juz,
      text,
    });

    closePanel();
  };

  const handleTabChange = (value: string) => {
    console.log("TAB PRESSED:", value);
    if (value === "font") {
      setPreviewFontSize(fontSize);
      setPanel("font");
      return;
    }

    // TODO: باقي التبويبات لاحقاً
    console.log("tab", value);
  };

  const handleSaveFont = () => {
    setFontSize(effectiveFontSize);
    closePanel();
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <AppBar
        title={surah.name}
        badge={`${surahType} · ${versesLabel(surah.versesCount)}`}
        onBack={() => router.back()}
        logo={logo}
      />

      <View style={styles.tabs}>
        <AppFilterTabs
          options={READING_TABS}
          value="reading"
          onChange={handleTabChange}
        />
      </View>

      <View
        style={[
          styles.page,
          { paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 16 },
        ]}
      >
        <MushafPageStrip
          edge="top"
          right={mushafPage.juzLabel}
          center={pageLabel}
          left={surah.name}
          highlightCenter
          bookmarked={pageHasBookmark}
        />

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={[
              styles.mushaf,
              {
                fontSize: effectiveFontSize,
                lineHeight: Math.round(effectiveFontSize * LINE_HEIGHT_RATIO),
              },
            ]}
          >
            {mushafPage.ayahs.map((ayah) => {
              const isSelected = ayahActive && ayahKey(ayah) === selectedKey;
              const hasBookmark = isBookmarked(ayah.surahId, ayah.number);

              return (
                <Text key={ayahKey(ayah)}>
                  <Text
                    style={isSelected && styles.selectedAyah}
                    onPress={() => handleAyahPress(ayah)}
                  >
                    {ayah.text}{" "}
                    <Text
                      style={[
                        styles.marker,
                        { fontSize: effectiveFontSize + 2 },
                        hasBookmark && styles.markerBookmarked,
                      ]}
                    >
                      {`\u06DD${toArabicDigits(ayah.number)}`}
                    </Text>
                  </Text>{" "}
                </Text>
              );
            })}
          </Text>
        </ScrollView>

        <MushafPageStrip
          edge="bottom"
          right={mushafPage.hizbLabel}
          center={`•${pageLabel}•`}
          left={surah.name}
        />
      </View>

      {selectedAyah && (
        <>
          <AppBottomSheet visible={panel === "sheet"} onClose={closePanel}>
            <AyahSheetContent
              surahName={selectedSurahName}
              ayahNumber={selectedAyah.number}
              ayahText={selectedAyah.text}
              locationLabel={mushafPage.quarterLabel}
              bookmarked={isBookmarked(
                selectedAyah.surahId,
                selectedAyah.number,
              )}
              onClose={closePanel}
              saved={isSaved(selectedAyah.surahId, selectedAyah.number)}
              onToggleFavorite={() =>
                toggleSaved({
                  surahId: selectedAyah.surahId,
                  surahName: selectedSurahName,
                  ayahNumber: selectedAyah.number,
                  ayahText: selectedAyah.text,
                  page: pageNumber,
                  juz: mushafPage.juz,
                })
              }
              onAction={handleQuickAction}
              onRepeatListen={() => console.log("repeat", selectedAyah.number)}
            />
          </AppBottomSheet>

          <AddNoteModal
            visible={panel === "note"}
            onClose={closePanel}
            surahName={selectedSurahName}
            ayahNumber={selectedAyah.number}
            ayahText={selectedAyah.text}
            onSave={handleSaveNote}
          />

          <TafsirModal
            visible={panel === "tafsir"}
            onClose={closePanel}
            sourceName={TAFSIR_SOURCE_NAME}
            surahName={selectedSurahName}
            ayahNumber={selectedAyah.number}
            ayahText={selectedAyah.text}
            tafsir={getTafsir(selectedAyah.surahId, selectedAyah.number)}
          />
        </>
      )}

      <FontSettingsModal
        visible={panel === "font"}
        onClose={closePanel}
        value={effectiveFontSize}
        onChange={setPreviewFontSize}
        onSave={handleSaveFont}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  flex: {
    flex: 1,
  },
  tabs: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  body: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 16,
  },
  mushaf: {
    fontFamily: THEME.typography.fontFamily.quran,
    color: THEME.colors.text,
    textAlign: "justify",
    writingDirection: "rtl",
  },
  marker: {
    color: GOLD,
  },
  markerBookmarked: {
    color: THEME.colors.primary,
  },
  selectedAyah: {
    backgroundColor: AYAH_HIGHLIGHT,
  },
  empty: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 14,
    color: THEME.colors.textSecondary,
    textAlign: "center",
    marginTop: 48,
  },
});
