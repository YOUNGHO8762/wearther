import { useRef } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useInputState from '@/hooks/useInputState';
import { extractErrorMessage } from '@/lib/utils';

interface Props {
  searchAddress: (searchTerm: string) => Promise<void>;
}

export default function AddressSearchForm({ searchAddress }: Props) {
  const [searchTerm, handleSearchTermChange] = useInputState();
  const lastSearchTermRef = useRef<string>('');

  const disabled =
    !searchTerm.trim() || searchTerm === lastSearchTermRef.current;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (disabled) {
      return;
    }

    try {
      await searchAddress(searchTerm);
      lastSearchTermRef.current = searchTerm;
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        placeholder="주소를 입력하세요"
        value={searchTerm}
        onChange={handleSearchTermChange}
        aria-label="주소"
        required
      />
      <Button type="submit" disabled={disabled}>
        검색
      </Button>
    </form>
  );
}
