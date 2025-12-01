import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useInputState from '@/hooks/useInputState';

interface Props {
  onSubmittedSearchTermChange: (searchTerm: string) => void;
}

export default function AddressSearchForm({
  onSubmittedSearchTermChange,
}: Props) {
  const [searchTerm, handleSearchTermChange] = useInputState();

  const disabled = !searchTerm.trim();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (disabled) {
      return;
    }

    onSubmittedSearchTermChange(searchTerm);
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
