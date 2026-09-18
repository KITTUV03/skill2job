'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Loader2, ShieldCheck, Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useApp();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if auth token/session exists in localStorage
    const storedAuth = typeof window !== 'undefined' ? localStorage.getItem('roleradar_auth') : null;
    const isAuthed = isAuthenticated || storedAuth === 'true';

    if (!isAuthed) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, pathname, router]);

  if (isChecking) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4 max-w-sm w-full animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/50 border border-primary-500/20 text-primary-600 dark:text-primary-400 mx-auto flex items-center justify-center">
            <Lock className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-extrabold">Verifying Authentication</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Confirming secure credentials for protected candidate portal...
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-primary-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Redirecting to Login if not signed in...</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
