import '@/styles/globals.css'
import type { AppProps } from 'next/app'


// App.tsx
import React, { useState } from 'react';
import SharedContextProvider from './SharedContextProvider';
import Home from './index';
import Chat from './chat';

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