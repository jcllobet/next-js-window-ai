import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/pages/index";
import SharedContextProvider from "@/contexts/SharedContextProvider";

jest.mock('next/router', () => require('next-router-mock'));

describe("Home", () => {
  it("renders the homepage with the title", () => {
    render(
      <SharedContextProvider>
        <Home />
      </SharedContextProvider>
    );
    expect(screen.getByText("Negotiate GPT 💼")).toBeInTheDocument();
  });

  it("renders the form with input fields and submit button", () => {
    render(
      <SharedContextProvider>
        <Home />
      </SharedContextProvider>
    );
    expect(screen.getByLabelText(/Your linkedin URL:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job description URL:/i)).toBeInTheDocument();
    expect(screen.getByText(/Start/i)).toBeInTheDocument();
  });

  it("updates the input fields when user types", async () => {
    render(
      <SharedContextProvider>
        <Home />
      </SharedContextProvider>
    );
    const linkedinInput = screen.getByPlaceholderText("https://www.linkedin.com/in/reidhoffman/");
    const jobDescriptionInput = screen.getByPlaceholderText("https://openai.com/careers/workplace-ops-openai-hq-events");
  
    fireEvent.change(linkedinInput, {
      target: { value: "https://linkedin.com/in/example" },
    });
    fireEvent.change(jobDescriptionInput, {
      target: { value: "https://example.com/job-description" },
    });
    
  
    await waitFor(() => {
      expect(linkedinInput).toHaveValue("https://linkedin.com/in/example");
      expect(jobDescriptionInput).toHaveValue(
        "https://example.com/job-description"
      );
    });
  });
});
