'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import AddressSearchForm from '@/components/AddressSearchForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useErrorToast from '@/hooks/useErrorToast';
import useSearchAddress from '@/hooks/useSearchAddress';
import { extractErrorMessage } from '@/lib/utils';
import { fetchLocationByPlaceID } from '@/services/addressAPI';
import { Geolocation } from '@/types/geolocation';

interface Props {
  children: React.ReactNode;
  onSelect: (geolocation: Geolocation) => void;
}

export default function AddressSearchDialog({ children, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const { addresses, error } = useSearchAddress(submittedSearchTerm);
  useErrorToast(error);

  const handleAddressClick = async (placeID: string) => {
    try {
      const { lat, lng } = await fetchLocationByPlaceID(placeID);

      onSelect({
        latitude: lat,
        longitude: lng,
      });
      setOpen(false);
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setSubmittedSearchTerm('');
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>주소 검색</DialogTitle>
          <DialogDescription className="sr-only">
            주소를 검색하여 위치를 변경하세요
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <AddressSearchForm
            onSubmittedSearchTermChange={setSubmittedSearchTerm}
          />
          <div aria-live="polite" aria-atomic="true">
            {addresses?.length === 0 && (
              <p className="text-muted-foreground py-4 text-center">
                검색 결과가 없습니다.
              </p>
            )}
            {addresses && addresses.length > 0 && (
              <p className="sr-only">검색 결과 : {addresses.length}개</p>
            )}
          </div>
          {addresses && addresses.length > 0 && (
            <ul className="max-h-60 space-y-1 overflow-y-auto overscroll-contain">
              {addresses.map((address) => (
                <li key={address.place_id}>
                  <button
                    type="button"
                    className="w-full cursor-pointer rounded-md p-3 text-start text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
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
