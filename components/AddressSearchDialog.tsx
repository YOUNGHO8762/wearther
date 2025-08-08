'use client';

import AddressSearchForm from '@/components/AddressSearchForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useSearchAddress from '@/hooks/useSearchAddress';
import { extractErrorMessage } from '@/lib/utils';
import { ADDRESS_DETAILS_URL } from '@/services/api/endpoint';
import { httpClient } from '@/services/api/httpClient';
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
  const { searchResults, handleAddressSearch } = useSearchAddress();

  const handleAnimationEnd = () => {
    if (!isOpen) {
      onExit();
    }
  };

  const handleAddressSelect = async (placeId: string) => {
    try {
      const response = await httpClient.get<FetchAddressDetailsResponse>(
        `${ADDRESS_DETAILS_URL}?placeID=${placeId}`,
      );

      handleSetGeolocation({
        latitude: response.result.geometry.location.lat,
        longitude: response.result.geometry.location.lng,
      });
      close();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        className="max-w-md"
        onAnimationEnd={handleAnimationEnd}
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle>주소 검색</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <AddressSearchForm handleAddressSearch={handleAddressSearch} />
          {searchResults && !searchResults?.length && (
            <p className="text-muted-foreground py-4 text-center">
              검색 결과가 없습니다.
            </p>
          )}
          {!!searchResults?.length && (
            <ul className="max-h-60 space-y-1 overflow-y-auto">
              {searchResults.map((address) => (
                <li key={address.place_id}>
                  <button
                    type="button"
                    className="hover:bg-muted focus:bg-muted w-full cursor-pointer rounded-md p-3 text-start text-sm transition-colors focus:outline-none"
                    onClick={() => handleAddressSelect(address.place_id)}
                  >
                    {address.description}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
