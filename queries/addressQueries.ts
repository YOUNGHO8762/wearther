import { queryOptions } from '@tanstack/react-query';

import { fetchAddresses } from '@/services/addressAPI';

const addressQueries = {
  all: () => ['address'],
  searches: () => [...addressQueries.all(), 'search'],
  search: (searchTerm: string) =>
    queryOptions({
      staleTime: Infinity,
      gcTime: Infinity,
      queryKey: [...addressQueries.searches(), searchTerm],
      queryFn: () => fetchAddresses(searchTerm),
    }),
};

export default addressQueries;
