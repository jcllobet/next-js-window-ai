import React, { ChangeEvent, FormEvent, useState, useEffect, useRef, useContext } from 'react';
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
// import Papa from "papaparse";
import { useRouter } from 'next/router';
import SharedContext from './SharedContext';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

type TargetType = "profile" | "job_post" | "";

export default function Home() {
  const sharedState = useContext(SharedContext);
  const router = useRouter();

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
  

  // Log state variables when they change
  useEffect(() => {
    console.log('userURL:', userURL);
    console.log('jobURL:', jobURL);
  }, [userURL, jobURL]);

  useEffect(() => {
    if (!(window as any).ai) {
      console.warn("AI not available in window");
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("hello")

    if (jobURL.length < 1 || userURL.length < 1) {
      console.log("bruh");
      return;
    }
    
    try {
      console.log('inside the try attempt');
      console.log(userURL);
      console.log(`Type of URL: ${typeof userURL}`)
      const fetchedUserProfile = await fetchPageData(userURL);
      const fetchedJobDescription = await fetchPageData(jobURL);
      setUserProfile(fetchedUserProfile);
      setJobDescription(fetchedJobDescription);

      // downloadCSV(jobData, location);

      //if ((window as any)?.ai) {
      //  try {
      //    console.log("OK")
      //    const userResponse = await (window as any).ai.getCompletion(
      //      { messages: [{ role: 'system', content: `insert prompt for user info summary ${userProfile}` }, ...messages, newMessage] },
      //      streamingOptions
      //    );
      //    console.log(userResponse.message.content);
      //    setProcessedUserProfile(userResponse.message.content);
          // const jobResponse = await (window as any).ai.getCompletion(
          //   { messages: [{ role: 'system', content: `insert prompt for job info summary ${jobDescription}` }] }
          // );
          // console.log(jobResponse.message.content);
          // setProcessedUserProfile(jobResponse.message.content);
      //  } catch (e) {
      //    console.error(e);
      //  }
        try {
          console.log(processedUserProfile)
          console.log(processedJobDescription)
          const userResponse = await fetch("/api/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput: `Summarize the following LinkedIn profile: \n ${userProfile}` }),
          });
    
          const userData = await userResponse.json();
          if (userResponse.status !== 200) {
            throw userData.error || new Error(`Request failed with status ${userResponse.status}`);
          }
          console.log(userData.output);
          setProcessedUserProfile(userData.output.text);
          const jobResponse = await fetch("/api/generate", {
            method: "POST",
            headers: {
              "output-Type": "application/json",
            },
            body: JSON.stringify({ userInput: `Summarize the following job description: \n ${jobDescription}` }),
          });
    
          const jobData = await jobResponse.json();
          if (jobResponse.status !== 200) {
            throw jobData.error || new Error(`Request failed with status ${jobResponse.status}`);
          }
          console.log(jobData.output);
          setProcessedJobDescription(jobData.output.text);
        }
        catch (e) {
          console.error(e);
        }

      resetForm();
      // router.push('/chat');
    }
    catch {
      return;
    } 
  }

  async function fetchPageData(url: string) {
    const response = await fetch(`http://localhost:3000/api/scraper`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: url}),
    });

    return await response.json();
  }

  function resetForm() {
    setUserURL("");
    setJobURL("");
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

        <form onSubmit={handleSubmit} className="">
            <label className="block">
              <span className="text-gray-700">Your linkedin URL: </span>
              <input
                value={userURL}
                onChange={(e) => setUserURL(e.target.value)}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Job description URL: </span>
              <input
                value={jobURL}
                onChange={(e) => setJobURL(e.target.value)}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </label>
          <button type ="submit" className={`${styles.textWhite} ${styles.fontBold} ${styles.py2} ${styles.px4} ${styles.btnLarger} ${styles.gradientBackground} ${styles.rounded} `}>
            Start
          </button>
        </form>
      </main>
    </div>
  );
}
