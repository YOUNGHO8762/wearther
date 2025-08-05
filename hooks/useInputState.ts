import { ChangeEvent, useCallback, useState } from 'react';

const echo = (v: string) => v;

export default function useInputState(
  initialValue = '',
  transformValue: (value: string) => string = echo,
) {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setValue(transformValue(value));
    },
    [transformValue],
  );

  return [value, handleValueChange] as const;
}
