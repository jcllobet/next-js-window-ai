import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

interface FormProps {
  userURL: string;
  jobURL: string;
  setUserURL: (value: string) => void;
  setJobURL: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ userURL, jobURL, setUserURL, setJobURL, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="">
      <InputField
        id="linkedinUrl"
        label="Your LinkedIn URL"
        value={userURL}
        placeholder="https://www.linkedin.com/in/reidhoffman/"
        onChange={(e) => setUserURL(e.target.value)}
      />
      <InputField
        id="jobDescriptionUrl"
        label="Job description URL"
        value={jobURL}
        placeholder="https://openai.com/careers/workplace-ops-openai-hq-events"
        onChange={(e) => setJobURL(e.target.value)}
      />
      <SubmitButton type="submit" text = "Start" />
    </form>
  );
};

export default Form;
