// SharedContextProvider.tsx

import React, { useState } from 'react';
import SharedContext, { SharedState } from './SharedContext';

interface SharedContextProviderProps {
  children: React.ReactNode;
}

const SharedContextProvider: React.FC<SharedContextProviderProps> = ({ children }) => {
  const [userURL, setUserURL] = useState('');
  const [jobURL, setJobURL] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [processedUserProfile, setProcessedUserProfile] = useState('');
  const [processedJobDescription, setProcessedJobDescription] = useState('');

  const sharedState: SharedState = {
    userURL,
    setUserURL,
    jobURL,
    setJobURL,
    userProfile,
    setUserProfile,
    jobDescription,
    setJobDescription,
    processedUserProfile,
    setProcessedUserProfile,
    processedJobDescription,
    setProcessedJobDescription,
  };

  return (
    <SharedContext.Provider value={sharedState}>
      {children}
    </SharedContext.Provider>
  );
};

export default SharedContextProvider;