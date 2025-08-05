import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useInputState from '@/hooks/useInputState';
import usePrevious from '@/hooks/usePrevious';

interface Props {
  handleAddressSearch: (input: string) => void;
}

export default function AddressSearchForm({ handleAddressSearch }: Props) {
  const [searchTerm, setSearchTerm] = useInputState();
  const previousSearchTerm = usePrevious(searchTerm);
  const disabled = !searchTerm.trim() || previousSearchTerm === searchTerm;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled) {
      return;
    }

    handleAddressSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        placeholder="주소를 입력하세요."
        value={searchTerm}
        onChange={setSearchTerm}
        autoFocus
      />
      <Button type="submit" disabled={disabled}>
        검색
      </Button>
    </form>
  );
}
