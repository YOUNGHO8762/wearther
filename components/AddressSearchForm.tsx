import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useInputState from '@/hooks/useInputState';

interface Props {
  handleSearchTermChange: (input: string) => void;
}

export default function AddressSearchForm({ handleSearchTermChange }: Props) {
  const [enterTerm, handleEnterTermChange] = useInputState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearchTermChange(enterTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        placeholder="주소를 입력하세요."
        value={enterTerm}
        onChange={handleEnterTermChange}
        autoFocus
      />
      <Button type="submit" disabled={!enterTerm.trim()}>
        검색
      </Button>
    </form>
  );
}
