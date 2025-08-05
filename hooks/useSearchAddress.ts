import { useState } from 'react';
import { toast } from 'sonner';

import { extractErrorMessage } from '@/lib/utils';
import { fetchAddressSearch } from '@/services/addressAPI';
import { Predictions } from '@/types/address';

export default function useSearchAddress() {
  const [searchResults, setSearchResults] = useState<Predictions[] | null>(
    null,
  );

  const handleAddressSearch = async (searchTerm: string) => {
    try {
      const response = await fetchAddressSearch(searchTerm);
      setSearchResults(response);
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return { searchResults, handleAddressSearch };
}
