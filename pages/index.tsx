// index.tsx

// External libraries
import React, { ChangeEvent, FormEvent, useState, useEffect, useRef, useContext } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router';
import { get_encoding } from "@dqbd/tiktoken";


// Components
import Form from "../components/Form";

// Contexts
import SharedContext from '../contexts/SharedContext';

//Hooks
import { usePageData } from '../hooks/usePageData';
import { useChatCompletion } from '@/hooks/useChatCompletion';

// Styles
import styles from "../styles/Home.module.css";

//Types
import { Message, Messages, RequestOptions } from '../types/index';


export default function Home() {
  const sharedState = useContext(SharedContext);
  const [error, setError] = useState<string | null>(null);
  const { fetchPageData } = usePageData();
  const { fetchChatCompletion } = useChatCompletion();
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

  function chunkText(text: string, maxTokens: number) {
    const encoding = get_encoding("cl100k_base");
    const tokens = encoding.encode(text);
    const chunks = [];
  
    let start = 0;
    let end = maxTokens;
  
    while (start < tokens.length) {
      end = Math.min(end, tokens.length);
      chunks.push(encoding.decode(tokens.slice(start, end)));
      start = end;
      end += maxTokens;
    }
  
    return chunks;
  }
  

  const requestOptions: RequestOptions = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: "If you can hear me, say POTATO" },
    ],
    temperature: 0.8,
    max_tokens: 100,
  };
  
  async function fetchUrl(givenUrl: string) {
    try {
      const response = await fetchPageData(givenUrl);
      if (!response || response.status !== 200) {
        const errorMessage = `Error: Request failed with status ${response?.status}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      } else {
        setError(null);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
  

  async function fetchOpenAIResponse(input: string | Uint8Array) {
    const requestOptions: RequestOptions = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
      temperature: 0.8,
      max_tokens: 100,
    };
  
    const response = await fetchChatCompletion(requestOptions);
  
    if (!response || response.status !== 200) {
      const errorMessage = `Error: Request failed with status ${response?.status}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } else {
      setError(null);
    }
  
    const data = await response.json();
    return data.message;
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
      // Temporary storage of the fetched data to ensure that generate awaits the fetch
      const fetchedUserProfile = await fetchUrl(userUrl);
      console.log(`userProfile: ${fetchedUserProfile}`);
      const splitUserProfile = fetchedUserProfile.split("User Agreement\nPrivacy Policy");

      const profileInputChunks = chunkText(splitUserProfile, 4000);
      const userProfileSummaryChunks = [];

      for (const chunk of profileInputChunks) {
        const userProfileSummaryChunk = await fetchOpenAIResponse(chunk);
        userProfileSummaryChunks.push(userProfileSummaryChunk);
      }

      const userProfileSummary = userProfileSummaryChunks.join("\n");
      console.log(`userProfileSummary: ${userProfileSummary}`);

      // const userProfileSummary = await fetchOpenAIResponse(profileInput) //"If you can hear me say POTATO")
      // console.log(`userProfileSummary: ${userProfileSummary}`);

      //const fetchedJobDescription = await fetchUrl(jobUrl);
      //console.log(`jobDescription: ${fetchedJobDescription}`);
      //const jobInput = `Summarize the following job description: \n ${fetchedJobDescription}`;
      //const jobDescriptionSummary = await fetchOpenAIResponse("If you can hear me say APPLE") //jobInput);
      //console.log(`jobDescriptionSummary: ${jobDescriptionSummary}`);

      // Update the state variables
      setUserProfile(fetchedUserProfile);
      //setJobDescription(fetchedJobDescription);
      setProcessedUserProfile(userProfileSummary);
      //setProcessedJobDescription(jobDescriptionSummary);

      // Set the initial message as the sum of the user's profile and the job description
      const initialMessage: Message = { role: 'user', content: `${processedUserProfile} ${processedJobDescription}` };
      setMessages([...messages, initialMessage]);
      resetForm();
    } catch {
      return;
    }
  }

  // useEffect(() => {
  //   async function aggregateResponses() {
  //     // Combine userProfileSummary and jobDescriptionSummary
  //     const combinedInput = `${processedUserProfile} ${processedJobDescription}`;
  //     // Send the aggregated input to the API
  //     const aggregatedResponse = await fetchOpenAIResponse(combinedInput);
  //     // Set the aggregated response as the final message
  //     const finalMessage: Message = { role: 'ai', content: aggregatedResponse };
  //     setMessages([...messages, finalMessage]);
  //   }
  
  //   if (processedUserProfile && processedJobDescription) {
  //     aggregateResponses();
  //   }
  // }, [processedUserProfile, processedJobDescription]);
  


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