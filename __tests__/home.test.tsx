import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/pages/index";
import SharedContextProvider from "@/pages/SharedContextProvider";
import { useRouter } from 'next/router';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

const ExampleComponent = ({ href = '' }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(href)}>
      The current route is: "{router.asPath}"
    </button>
  );
}

describe('next-router-mock', () => {
  it('mocks the useRouter hook', () => {
    // Set the initial url:
    mockRouter.push("/initial-path");
    
    // Render the component:
    render(<ExampleComponent href="/foo?bar=baz" />);
    expect(screen.getByRole('button')).toHaveText(
      'The current route is: "/initial-path"'
    );

    // Click the button:
    fireEvent.click(screen.getByRole('button'));
    
    // Ensure the router was updated:
    expect(mockRouter).toMatchObject({ 
      asPath: "/foo?bar=baz",
      pathname: "/foo",
      query: { bar: "baz" },
    });
  });
});

describe("Home", () => {
  it("renders the homepage with the title", () => {
    render(
      <SharedContextProvider>
        <Home />
      </SharedContextProvider>
    );
    expect(screen.getByText(/Negotiate GPT 💼/i)).toBeInTheDocument();
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

  it("updates the input fields when user types", () => {
    render(
      <SharedContextProvider>
        <Home />
      </SharedContextProvider>
    );
    const linkedinInput = screen.getByLabelText(/Your linkedin URL:/i);
    const jobDescriptionInput = screen.getByLabelText(/Job description URL:/i);

    userEvent.type(linkedinInput, "https://linkedin.com/in/example");
    userEvent.type(jobDescriptionInput, "https://example.com/job-description");

    expect(linkedinInput).toHaveValue("https://linkedin.com/in/example");
    expect(jobDescriptionInput).toHaveValue(
      "https://example.com/job-description"
    );
  });

  // Additional tests for form submission, fetching data, and routing can be added here.
});
