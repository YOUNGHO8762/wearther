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
import { fetchLocationByPlaceID } from '@/services/addressAPI';
import { Geolocation } from '@/types/geolocation';

interface Props {
  isOpen: boolean;
  close: () => void;
  onExit: () => void;
  updateGeolocation: (geolocation: Geolocation) => void;
}

export default function AddressSearchDialog({
  isOpen,
  close,
  onExit,
  updateGeolocation,
}: Props) {
  const { addresses, searchAddress } = useSearchAddress();

  const handleAnimationEnd = () => {
    if (!isOpen) {
      onExit();
    }
  };

  const handleAddressClick = async (placeID: string) => {
    try {
      const { lat, lng } = await fetchLocationByPlaceID(placeID);

      updateGeolocation({
        latitude: lat,
        longitude: lng,
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
          <AddressSearchForm searchAddress={searchAddress} />
          {addresses && !addresses?.length && (
            <p className="text-muted-foreground py-4 text-center">
              검색 결과가 없습니다.
            </p>
          )}
          {!!addresses?.length && (
            <ul className="max-h-60 space-y-1 overflow-y-auto">
              {addresses.map((address) => (
                <li key={address.place_id}>
                  <button
                    type="button"
                    className="hover:bg-muted focus:bg-muted w-full cursor-pointer rounded-md p-3 text-start text-sm transition-colors focus:outline-none"
                    onClick={() => handleAddressClick(address.place_id)}
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
