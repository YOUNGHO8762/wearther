'use client';

import AddressSearchForm from '@/components/AddressSearchForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useInputState from '@/hooks/useInputState';
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
  const [searchTerm, handleSearchTermChange] = useInputState('');
  const searchResults = useSearchAddress(searchTerm);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      onExit();
    }
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
          <AddressSearchForm handleSearchTermChange={handleSearchTermChange} />
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
