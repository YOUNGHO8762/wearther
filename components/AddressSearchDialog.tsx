'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useSearchAddress from '@/hooks/useSearchAddress';
import { ADDRESS_DETAILS_URL } from '@/services/api/endpoint';
import { apiClient } from '@/services/api/httpClient';
import { FetchAddressDetailsResponse } from '@/types/address';
import { Geolocation } from '@/types/geolocation';

interface Props {
  isOpen: boolean;
  close: () => void;
  onExit: () => void;
  handleSetGeolocation: (geolocation: Geolocation) => void;
}

export default function AddressSearchDialog({
  isOpen,
  close,
  onExit,
  handleSetGeolocation,
}: Props) {
  const [enterTerm, setEnterTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchResults = useSearchAddress(searchTerm);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      onExit();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!enterTerm.trim() || searchTerm === enterTerm) {
      return;
    }

    setSearchTerm(enterTerm);
  };

  const handleAddressSelect = async (placeId: string) => {
    const response = await apiClient.get<FetchAddressDetailsResponse>(
      `${ADDRESS_DETAILS_URL}?placeID=${placeId}`,
    );
    const geolocation = {
      latitude: response.result.geometry.location.lat,
      longitude: response.result.geometry.location.lng,
    };
    handleSetGeolocation(geolocation);
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-md" onAnimationEnd={handleAnimationEnd}>
        <DialogHeader>
          <DialogTitle>주소 검색</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              placeholder="주소를 입력하세요"
              value={enterTerm}
              onChange={(e) => setEnterTerm(e.target.value)}
              autoFocus
            />
            <Button type="submit" disabled={!enterTerm.trim()}>
              검색
            </Button>
          </form>
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
                  onClick={() => handleAddressSelect(address.place_id)}
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
