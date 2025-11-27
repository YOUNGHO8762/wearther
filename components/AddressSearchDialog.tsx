'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import AddressSearchForm from '@/components/AddressSearchForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useErrorToast from '@/hooks/useErrorToast';
import useSearchAddress from '@/hooks/useSearchAddress';
import { extractErrorMessage } from '@/lib/utils';
import { fetchLocationByPlaceID } from '@/services/addressAPI';
import { Geolocation } from '@/types/geolocation';

interface Props {
  isOpen: boolean;
  close: (geolocation?: Geolocation) => void;
  onExit: () => void;
}

export default function AddressSearchDialog({ isOpen, close, onExit }: Props) {
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const { addresses, error } = useSearchAddress(submittedSearchTerm);
  useErrorToast(error);

  const handleAnimationEnd = () => {
    if (isOpen) {
      return;
    }

    onExit();
  };

  const handleSubmittedSearchTermChange = (searchTerm: string) => {
    setSubmittedSearchTerm(searchTerm);
  };

  const handleAddressClick = async (placeID: string) => {
    try {
      const { lat, lng } = await fetchLocationByPlaceID(placeID);

      close({
        latitude: lat,
        longitude: lng,
      });
    } catch (error) {
      toast.error(extractErrorMessage(error));
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
          <AddressSearchForm
            onSubmittedSearchTermChange={handleSubmittedSearchTermChange}
          />
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
