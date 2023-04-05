// SharedContext.tsx
import { createContext } from 'react';

export interface SharedState {
  userURL: string;
  setUserURL: (value: string) => void;
  jobURL: string;
  setJobURL: (value: string) => void;
  userProfile: string;
  setUserProfile: (value: string) => void;
  jobDescription: string;
  setJobDescription: (value: string) => void;
}

const SharedContext = createContext<SharedState | null>(null);

export default SharedContext;
