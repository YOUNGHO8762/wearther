import { useQuery } from '@tanstack/react-query';

import addressQueries from '@/queries/addressQueries';

export default function useSearchAddress(searchTerm: string) {
  const { data: addresses, error } = useQuery({
    ...addressQueries.search(searchTerm),
    enabled: !!searchTerm,
  });

  return { addresses, error };
}
