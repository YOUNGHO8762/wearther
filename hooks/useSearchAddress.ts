import { useCallback, useState } from 'react';

import { fetchAddresses } from '@/services/addressAPI';
import { Predictions } from '@/types/address';

export default function useSearchAddress() {
  const [addresses, setAddresses] = useState<Predictions[] | null>(null);

  const searchAddress = useCallback(async (searchTerm: string) => {
    const response = await fetchAddresses(searchTerm);
    setAddresses(response);
  }, []);

  return { addresses, searchAddress };
}
