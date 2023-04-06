// App.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useState } from 'react';
import SharedContextProvider from './SharedContextProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SharedContextProvider>
      <Component {...pageProps} />
    </SharedContextProvider>
  );
}

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }