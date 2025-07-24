'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useSearchAddress from '@/hooks/useSearchAddress';

interface Props {
  isOpen: boolean;
  close: () => void;
  onExit: () => void;
}

export default function AddressSearchDialog({ isOpen, close, onExit }: Props) {
  const [enterTerm, setEnterTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchResults = useSearchAddress(searchTerm);

  const handleSearchClick = () => {
    setSearchTerm(enterTerm);
  };

  useEffect(() => {
    return () => onExit();
  }, [onExit]);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>주소 검색</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="주소를 입력하세요"
              value={enterTerm}
              onChange={(e) => setEnterTerm(e.target.value)}
              autoFocus
            />
            <Button onClick={handleSearchClick}>검색</Button>
          </div>

          {searchResults && !searchResults?.length && (
            <div className="text-muted-foreground py-4 text-center">
              검색 결과가 없습니다.
            </div>
          )}

          {!!searchResults?.length && (
            <div className="max-h-60 space-y-1 overflow-y-auto">
              {searchResults.map((address) => (
                <div
                  key={address.place_id}
                  tabIndex={0}
                  role="button"
                  aria-label={`주소 선택: ${address.description}`}
                  className="hover:bg-muted focus:bg-muted cursor-pointer rounded-md p-3 transition-colors focus:outline-none"
                  // onClick={() => handleSelectAddress(address)}
                >
                  <p className="text-sm font-medium">{address.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
