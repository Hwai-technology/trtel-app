import { Fragment, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import { THEME } from "../../constants/theme";

type AppOtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
};

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export default function AppOtpInput({
  value,
  onChange,
  length = 6,
  autoFocus = false,
}: AppOtpInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  // بيحوّل الأرقام العربية لإنجليزية وبيشيل أي شي مو رقم
  const handleChange = (text: string) => {
    const digits = text
      .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)))
      .replace(/\D/g, "")
      .slice(0, length);

    onChange(digits);
  };

  const activeIndex = Math.min(value.length, length - 1);
  const middle = Math.floor(length / 2);

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {Array.from({ length }).map((_, index) => (
          <Fragment key={index}>
            {/* النقطة بين المجموعتين */}
            {index === middle && <View style={styles.dot} />}

            <View
              style={[
                styles.box,
                isFocused && index === activeIndex && styles.boxActive,
              ]}
            >
              <Text style={styles.digit}>{value[index] ?? ""}</Text>
            </View>
          </Fragment>
        ))}
      </View>

      {/* الحقل المخفي: فوق المربعات وبياخد اللمس والكتابة */}
      <TextInput
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        autoFocus={autoFocus}
        caretHidden
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.hiddenInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },

  row: {
    flexDirection: "row-reverse", // أول خانة على اليمين
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  box: {
    flex: 1,
    maxWidth: 48,
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: THEME.radius.sm,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    ...THEME.shadows.small,
  },

  boxActive: {
    borderColor: THEME.colors.primary,
  },

  digit: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 22,
    color: THEME.colors.text,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D9B77A", // بدّليه بلون من الثيم إذا عندك
  },

  hiddenInput: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
});