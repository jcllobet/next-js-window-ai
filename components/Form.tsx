import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

interface FormProps {
  userUrl: string;
  jobUrl: string;
  setUserUrl: (value: string) => void;
  setJobUrl: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ userUrl, jobUrl, setUserUrl, setJobUrl, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="" data-testid= "form">
      <InputField
        id="linkedinUrl"
        label="https://www.linkedin.com/in/reidhoffman/" //TODO: "Your LinkedIn Url"
        value= {userUrl}
        placeholder="https://www.linkedin.com/in/reidhoffman/"
        onChange={(e) => setUserUrl(e.target.value)}
      />
      <InputField
        id="jobDescriptionUrl"
        label="https://openai.com/careers/workplace-ops-openai-hq-events" //TODO: "Job description Url"
        value= {jobUrl}
        placeholder="https://openai.com/careers/workplace-ops-openai-hq-events"
        onChange={(e) => setJobUrl(e.target.value)}
      />
      <SubmitButton type="submit" text = "Start" />
    </form>
  );
};

export default Form;
