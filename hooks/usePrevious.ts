import { useEffect, useRef } from 'react';

export default function usePrevious<T>(
  value: T,
  { defaultValue }: { defaultValue?: T } = {},
): T {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const ref = useRef<T>(defaultValue != null ? defaultValue : value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
