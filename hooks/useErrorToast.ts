import { useEffect } from 'react';
import { toast } from 'sonner';

import { extractErrorMessage } from '@/lib/utils';

export default function useErrorToast(error: Error | null) {
  useEffect(() => {
    if (!error) {
      return;
    }

    toast.error(extractErrorMessage(error));
  }, [error]);
}
