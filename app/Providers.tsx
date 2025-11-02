'use client'

import { HeroUIProvider } from '@heroui/react'
import { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast'
import { firaCode } from './fonts/fonts';

export function Providers({ children }: { children: React.ReactNode }) {
  /* Obtained From https://github.com/timolins/react-hot-toast/issues/31#issuecomment-803359550 */
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= 1) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <HeroUIProvider>
      <Toaster toastOptions={{
        style: {
          fontFamily: firaCode.style.fontFamily,
          fontSize: '13px',
        }
      }} position='bottom-center' />
      {children}
    </HeroUIProvider>
  )
}
