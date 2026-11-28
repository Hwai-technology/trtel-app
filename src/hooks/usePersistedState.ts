import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function usePersistedState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1) لما يفتح التطبيق: اقرا القيمة المحفوظة
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((json) => {
        if (json !== null) setValue(JSON.parse(json));
      })
      .catch(() => {})
      .finally(() => setIsLoaded(true));
  }, [key]);

  // 2) كل ما تتغير: احفظها (بعد ما نخلّص القراءة الأولى)
  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(key, JSON.stringify(value)).catch(() => {});
  }, [key, value, isLoaded]);

  return [value, setValue] as const;
}
