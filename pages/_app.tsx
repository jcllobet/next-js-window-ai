import '@/styles/globals.css'
import type { AppProps } from 'next/app'


// App.tsx
import React, { useState } from 'react';
import SharedContext, { SharedState } from './SharedContext';
import Home from './index';
import Chat from './chat';

export default function App({ Component, pageProps }: AppProps) {
  const [userURL, setUserURL] = useState<string>("");
  const [jobURL, setJobURL] = useState<string>("");
  const [userProfile, setUserProfile] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  
  const sharedState: SharedState = {
    userURL,
    setUserURL,
    jobURL,
    setJobURL,
    userProfile,
    setUserProfile,
    jobDescription,
    setJobDescription,
  };
  
  return (
    <SharedContext.Provider value={sharedState}>
      <Component {...pageProps} />
    </SharedContext.Provider>
  );
}

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }