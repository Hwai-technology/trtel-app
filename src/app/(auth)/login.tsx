// app/login.tsx
import { useState } from "react";
import type { ReactNode } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail, Sparkles, ArrowLeft } from "lucide-react-native";
import AppInput from "@/components/ui/AppInput";
import AppDropdown from "@/components/ui/AppDropdown";
import { THEME } from "@/constants/theme";
import AppButton from "@/components/ui/AppButton";
import { router, type Href } from "expo-router";

const USAGE_OPTIONS = [
  { label: "مستخدم يومي", value: "daily_user" },
  { label: "مالك حلقة", value: "circle_owner" },
];

// عنوان الحقل + النجمة + النص الصغير
type FieldProps = {
  label: string;
  required?: boolean;
  helperText?: string;
  children: ReactNode;
};

function Field({ label, required, helperText, children }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      {children}

      {helperText && <Text style={styles.helper}>{helperText}</Text>}
    </View>
  );
}

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState("");
  const [usage, setUsage] = useState("");

  const canSubmit = identifier.trim().length > 0 && usage !== "";

 const handleSendCode = () => {
  // TODO: استدعاء الـ API لإرسال الرمز
  router.push(
    `/otp?identifier=${encodeURIComponent(identifier.trim())}` as Href,
  );
};
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* الشعار + الجملة */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/trtel_logo (1).png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>
              سجّل دخولك وتابع رحلتك مع القرآن الكريم
            </Text>
          </View>

          {/* الحقول */}
          <View style={styles.form}>
            <Field
              label="البريد الإلكتروني أو رقم الهاتف"
              required
              helperText="سنرسل رمز التحقق إلى وسيلة التواصل التي تدخلها."
            >
              <AppInput
                value={identifier}
                onChangeText={setIdentifier}
                placeholder="ادخل بريدك أو رقم هاتفك"
                keyboardType="email-address"
                icon={<Mail size={20} color={THEME.colors.textSecondary} />}
              />
            </Field>

            <Field label="كيف تريد استخدام ترتيل؟" required>
              <AppDropdown
                value={usage}
                options={USAGE_OPTIONS}
                placeholder="اختر طريقة استخدامك لترتيل"
                onSelect={setUsage}
                icon={<Sparkles size={20} color={THEME.colors.textSecondary} />}
              />
            </Field>
          </View>

          <View style={styles.spacer} />

          {/* الزر + الشروط */}
          <View style={styles.footer}>
            <AppButton
              title="إرسال رمز التحقق"
              onPress={handleSendCode}
              disabled={!canSubmit}
              icon={
                <ArrowLeft
                  size={18}
                  color={canSubmit ? "#FFFFFF" : "#b3bdbb"}
                />
              }
            />

            <Text style={styles.terms}>
              بالمتابعة، أنت توافق على{" "}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL("https://example.com/terms")}
              >
                شروط الاستخدام
              </Text>
              {" و "}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL("https://example.com/privacy")}
              >
                سياسة الخصوصية
              </Text>
              .
            </Text>
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
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  header: {
    alignItems: "center",
    marginTop: 110,
    marginBottom: 80,
    gap: 16,
  },
  logo: {
    width: 80,
    height: 56,
  },
  subtitle: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 14,
    color: THEME.colors.textSecondary,
    textAlign: "center",
  },

  form: {
    gap: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 14,
    color: THEME.colors.text,
    textAlign: "right",
  },
  required: {
    color: "#E53935",
  },
  helper: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
    textAlign: "right",
  },

  spacer: {
    flex: 1,
    minHeight: 40,
  },

  footer: {
    gap: 16,
    alignItems: "center",
  },
  terms: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
    textAlign: "center",
  },
  link: {
    color: THEME.colors.primary,
    textDecorationLine: "underline",
  },
});
