import React, { ChangeEvent, FormEvent, useState, useEffect, useRef } from 'react';
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import Papa from "papaparse";

type TargetType = "profile" | "job_post" | "";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<TargetType>("");
  const [userProfile, setUserProfile] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [location, setJobLocation] = useState<string>("");

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.currentTarget.value as TargetType);
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (jobType.length < 1 || location.length < 1) {
      return;
    }

    const jobData = await fetchJobData(jobType, location);
    // downloadCSV(jobData, location);

    resetForm();
  }

  async function fetchJobData(jobType: string, location: string) {
    const response = await fetch(`http://localhost:3000/api/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: jobType, location }),
    });

    return await response.json();
  }

  function resetForm() {
    setJobType("");
    setJobLocation("");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>LinkedIn on Autopilot</title>
        <meta name="description" content="LinkedIn on Autopilot App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${styles.flex} ${styles.flexCol} ${styles.itemsCenter} ${styles.justifyCenter} ${styles.minHScreen} ${styles.py2}`}>
        <h1 className={`${styles.text4xl} ${styles.fontBold} ${styles.mb4}`}>
          Welcome to LinkedIn on Autopilot
        </h1>
        <p className={`${styles.textXl} ${styles.mb8} ${styles.textGray700}`}>
          This app helps you scrape linkedin Data in a JSON format based on your search criteria.
        </p>
        <h1 className={styles.text4xl}>LinkedIn Scraper</h1>
        <form onSubmit={handleSubmit} className={styles.spaceY4}>
          <label className="">
            <span className="">Target Type </span>
            <select
              id="select_field"
              value={selectedOption}
              onChange={handleSelectChange}
              className=""
            >
              <option value="">-- Select --</option>
              <option value="profile">Profile</option>
              <option value="job_post">Job Post</option>
            </select>
          </label>

          {selectedOption === "profile" && (
            <InputField label="User URL:" value={userProfile} onChange={(e) => setUserProfile(e.target.value)} />
          )}

          {selectedOption === "job_post" && (
            <>
              <InputField label="Job Search" value={jobType} onChange={(e) => setJobType(e.target.value)} />
              <InputField label="Location Search" value={location} onChange={(e) => setJobLocation(e.target.value)} />
            </>
          )}

          <SubmitButton />
        <Link href="/chat" passHref>
          <button className={`${styles.textWhite} ${styles.fontBold} ${styles.py2} ${styles.px4} ${styles.btnLarger} ${styles.gradientBackground} ${styles.rounded} `}>
            Start
          </button>
        </Link>
        </form>
      </main>
    </div>
  );
}
