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
  const router = useRouter();

  const { fetchPageData } = usePageData();


  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  if (!sharedState) {
    return null;
  }

  const {
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
  } = sharedState;
  
  async function processURLs(userURL: string, jobURL: string) {
    const fetchedUserProfile = await fetchPageData(userURL);
    const fetchedJobDescription = await fetchPageData(jobURL);
  
    setUserProfile(fetchedUserProfile);
    setJobDescription(fetchedJobDescription);
  
    const userProfileSummary = await generateSummary(`Summarize the following LinkedIn profile: \n ${fetchedUserProfile}`);
    setProcessedUserProfile(userProfileSummary);
    const jobDescriptionSummary = await generateSummary(`Summarize the following job description: \n ${fetchedJobDescription}`);
    setProcessedJobDescription(jobDescriptionSummary);
  }
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    if (jobURL.length < 1 || userURL.length < 1) {
      console.log('Both URLs are required');
      return;
    }
  
    try {
      await processURLs(userURL, jobURL);
      resetForm();
    } catch {
      return;
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
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    return data.output.text;
  }

  function resetForm() {
    setUserURL('');
    setJobURL('');
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

        <Form
          userURL={userURL}
          jobURL={jobURL}
          setUserURL={setUserURL}
          setJobURL={setJobURL}
          handleSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}