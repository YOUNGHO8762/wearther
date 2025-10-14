import { useState } from 'react';
import { toast } from 'sonner';

import { extractErrorMessage } from '@/lib/utils';
import { fetchAddresses } from '@/services/addressAPI';
import { Predictions } from '@/types/address';

export default function useSearchAddress() {
  const [addresses, setAddresses] = useState<Predictions[] | null>(null);

  const searchAddress = async (searchTerm: string) => {
    try {
      const response = await fetchAddresses(searchTerm);
      setAddresses(response);
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return { addresses, searchAddress };
}
