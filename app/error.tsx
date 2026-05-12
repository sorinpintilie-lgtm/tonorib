'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-coral-50 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-coral" />
      </div>
      <div>
        <h2 className="font-manrope font-bold text-2xl text-slate mb-2">
          Something went wrong
        </h2>
        <p className="text-slate-500 max-w-md">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>
      </div>
      <Button
        variant="primary"
        onClick={reset}
        className="flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Try again
      </Button>
    </div>
  );
}
