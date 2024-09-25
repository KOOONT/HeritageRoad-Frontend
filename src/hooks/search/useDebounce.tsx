import { useState, useEffect } from 'react';

function useDebounce<T>(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      // 공백 제거 후 디바운스 값 설정
      setDebouncedValue(value.trim());
    }, delay);

    // value가 변경되면 기존 타이머를 클리어하고 새로 설정
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
