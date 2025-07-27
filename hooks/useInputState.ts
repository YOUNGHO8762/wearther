import { ChangeEvent, useCallback, useState } from 'react';

const echo = (v: string) => v;

export default function useInputState(
  initialValue = '',
  transformValue: (value: string) => string = echo,
) {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = useCallback(
    (input: ChangeEvent<HTMLInputElement> | string) => {
      const newValue = typeof input === 'string' ? input : input.target.value;
      setValue(transformValue(newValue));
    },
    [transformValue],
  );

  return [value, handleValueChange] as const;
}
