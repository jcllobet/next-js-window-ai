// External libraries
import React, { ChangeEvent, FormEvent, useState, useEffect, useRef, useContext } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router';

// Components
import Form from "../components/Form";

// Contexts
import SharedContext from '../contexts/SharedContext';

//Hooks
import { usePageData } from '../hooks/usePageData';

// Styles
import styles from "../styles/Home.module.css";

//Types
import { Message } from '../types/index';


export default function Home() {
  const sharedState = useContext(SharedContext);
  const [error, setError] = useState<string | null>(null);
  const { fetchPageData } = usePageData();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  if (!sharedState) {
    return null;
  }

  const {
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
  } = sharedState;
  
  async function fetchUrl(givenUrl: string) {
    try {
      const response = await fetchPageData(givenUrl);
      return response;s
    } catch (error) {
      console.log(error);
    }
  }

  async function generateSummary(input: string) {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput: input }),
    });
  
    const data = await response.json();
    if (response.status !== 200) {
      const errorMessage = data.error || `Error: Request failed with status ${response.status}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } else {
      setError(null);
    }
  
    return data.output.text;
  }
  

  function resetForm() {
    setUserUrl('');
    setJobUrl('');
  }
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(jobUrl)
    if (jobUrl.length < 1 || userUrl.length < 1) {
      console.log('Both URLs are required');
      return;
    }
  
    try {
      // Temporarly storing the fetched data to ensure that generate awaits the fetch
      const fetchedUserProfile = await fetchUrl(userUrl);
      console.log(`userProfile: ${fetchedUserProfile}`);

      const fetchedJobDescription = await fetchUrl(jobUrl);
      console.log(`jobDescription: ${fetchedJobDescription}`);

      const userProfileSummary = await generateSummary(`Summarize the following LinkedIn profile: \n ${fetchedUserProfile}`);
      console.log(`userProfileSummary: ${userProfileSummary}`);

      const jobDescriptionSummary = await generateSummary(`Summarize the following job description: \n ${fetchedJobDescription}`);
      console.log(`jobDescriptionSummary: ${jobDescriptionSummary}`);

      // Update the state variables
      setUserProfile(fetchedUserProfile);
      setJobDescription(fetchedJobDescription);
      setProcessedUserProfile(userProfileSummary);
      setProcessedJobDescription(jobDescriptionSummary);

      // Set the initial message as the sum of the user's profile and the job description
      const initialMessage: Message = { role: 'user', content: `${processedUserProfile} ${processedJobDescription}` };
      resetForm();
    } catch {
      return;
    }
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Negotiate GPT 💼</title>
        <meta name="description" content="Helping you practice your final stage of the interview" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${styles.flex} ${styles.flexCol} ${styles.itemsCenter} ${styles.justifyCenter} ${styles.minHScreen} ${styles.py2}`}>
        <h1 className={styles.text4xl}>Negotiate GPT 💼</h1>
        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-5" role="alert">
            <p>{error}</p>
          </div>
        )}
        <Form
          userUrl={userUrl}
          jobUrl={jobUrl}
          setUserUrl={setUserUrl}
          setJobUrl={setJobUrl}
          handleSubmit={handleSubmit}
        />

      </main>
    </div>
  );
}