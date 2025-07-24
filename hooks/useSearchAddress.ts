import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { extractErrorMessage } from '@/lib/utils';
import { fetchAddressSearch } from '@/services/addressAPI';
import { Predictions } from '@/types/address';

export default function useSearchAddress(searchTerm: string) {
  const [searchResults, setSearchResults] = useState<Predictions[] | null>(
    null,
  );

  useEffect(() => {
    if (!searchTerm.trim()) {
      return;
    }

    (async () => {
      try {
        const response = await fetchAddressSearch(searchTerm);
        setSearchResults(response);
      } catch (error) {
        toast.error(extractErrorMessage(error));
      }
    })();
  }, [searchTerm]);

  return searchResults;
}
