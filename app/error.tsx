'use client';

import { Button } from '@/components/ui/button';
import { extractErrorMessage } from '@/lib/utils';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center text-center">
      <div className="mb-4 text-4xl">⚠️</div>
      <h2 className="mb-2 text-xl font-semibold text-red-500">
        오류가 발생했습니다
      </h2>
      <p className="mb-4 text-red-500">{extractErrorMessage(error)}</p>
      <Button onClick={reset} variant="destructive">
        다시 시도
      </Button>
    </div>
  );
}
