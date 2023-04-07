// SharedContextProvider.tsx

import React, { useState } from 'react';
import SharedContext, { SharedState } from './SharedContext';

interface SharedContextProviderProps {
  children: React.ReactNode;
}

const SharedContextProvider: React.FC<SharedContextProviderProps> = ({ children }) => {
  const [userUrl, setUserUrl] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [processedUserProfile, setProcessedUserProfile] = useState('');
  const [processedJobDescription, setProcessedJobDescription] = useState('');

  const sharedState: SharedState = {
    userUrl,
    setUserUrl,
    jobUrl,
    setJobUrl,
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