import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { AtSign, Phone, Clock, ArrowLeft, BookOpen } from "lucide-react-native";

import { THEME } from "@/constants/theme";
import AppBar from "@/components/ui/AppBar";
import AppButton from "@/components/ui/AppButton";
import AppOtpInput from "@/components/ui/AppOtpInput";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

// ألوان من التصميم (بدّليها بألوان الثيم إذا موجودة)
const GOLD = "#B39A5E";
const SURFACE = "#F0EDE4";

// ha****@gmail.com  أو  ****123
function maskIdentifier(value: string) {
  if (value.includes("@")) {
    const [name, domain] = value.split("@");
    return `${name.slice(0, 2)}****@${domain}`;
  }
  return `****${value.slice(-3)}`;
}

// 30 ← "00:30"
function formatTime(totalSeconds: number) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function OtpScreen() {
  // القيمة اللي أرسلناها من شاشة اللوغ إن
  const { identifier = "" } = useLocalSearchParams<{ identifier?: string }>();

  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const isEmail = identifier.includes("@");
  const canSubmit = code.length === OTP_LENGTH;

  // عدّاد تنازلي: كل ثانية بينقص واحد، وبيوقف عند الصفر
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    setCode("");
    setSecondsLeft(RESEND_SECONDS);
    // TODO: استدعاء الـ API لإعادة إرسال الرمز
  };

  const handleVerify = () => {
    // TODO: استدعاء الـ API للتحقق من الرمز (code)
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <AppBar
        onBack={() => router.back()}
        logo={
          <Image
            source={require("../../assets/images/trtel_logo (1).png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        }
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* العنوان */}
          <Text style={styles.title}>تحقق من رمز التأكيد</Text>
          <Text style={styles.subtitle}>
            أرسلنا رمزاً مكوّناً من 6 أرقام لتأكيد جلسة التلاوة إلى:
          </Text>

          {/* كبسولة الإيميل / الرقم */}
          <View style={styles.chip}>
            {isEmail ? (
              <AtSign size={16} color={THEME.colors.primary} />
            ) : (
              <Phone size={16} color={THEME.colors.primary} />
            )}
            <Text style={styles.chipText}>{maskIdentifier(identifier)}</Text>
          </View>

          {/* خانات الرمز */}
          <View style={styles.otp}>
            <AppOtpInput value={code} onChange={setCode} length={OTP_LENGTH} />
          </View>

          {/* إعادة الإرسال */}
          <View style={styles.resendRow}>
            <View style={styles.resendGroup}>
              <Clock size={16} color={GOLD} />
              <Text style={styles.resendText}>لم يصلك الرمز؟</Text>
            </View>

            {secondsLeft > 0 ? (
              <View style={styles.resendGroup}>
                <Text style={styles.resendText}>إعادة الإرسال بعد:</Text>
                <Text style={styles.timer}>{formatTime(secondsLeft)}</Text>
              </View>
            ) : (
              <Pressable onPress={handleResend}>
                <Text style={styles.resendLink}>إعادة إرسال الرمز</Text>
              </Pressable>
            )}
          </View>

          {/* الزر */}
          <View style={styles.button}>
            <AppButton
              title="تحقق وتابع التلاوة"
              onPress={handleVerify}
              disabled={!canSubmit}
              icon={
                <ArrowLeft
                  size={18}
                  color={canSubmit ? "#FFFFFF" : "#b3bdbb"}
                />
              }
            />
          </View>

          {/* بطاقة الآية */}
          <View style={styles.verseCard}>
            <BookOpen size={20} color={GOLD} />
            <Text style={styles.verse}>«وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا»</Text>
            <Text style={styles.verseSource}>سورة المزمل — آية ٤</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  scroll: {
    flexGrow: 1,
    justifyContent: "center", // المحتوى بنص الشاشة تقريباً
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  title: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 20,
    color: THEME.colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 14,
    color: THEME.colors.textSecondary,
    textAlign: "center",
    marginTop: 8,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 8,
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#ECECE8",
  },
  chipText: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 14,
    color: THEME.colors.text,
  },

  otp: {
    marginTop: 32,
  },

  resendRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: THEME.radius.sm,
    backgroundColor: SURFACE,
  },
  resendGroup: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
  },
  resendText: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  timer: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 14,
    color: THEME.colors.primary,
  },
  resendLink: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 13,
    color: THEME.colors.primary,
    textDecorationLine: "underline",
  },

  button: {
    marginTop: 16,
  },

  verseCard: {
    alignItems: "center",
    gap: 6,
    marginTop: 28,
    padding: 16,
    borderRadius: THEME.radius.sm,
    backgroundColor: SURFACE,
  },
  verse: {
    fontFamily: THEME.typography.fontFamily.quran,
    fontSize: 18,
    color: THEME.colors.text,
    textAlign: "center",
  },
  verseSource: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: GOLD,
  },
});
