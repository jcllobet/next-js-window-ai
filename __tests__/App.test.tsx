import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../pages/_app";
import {AppProps} from "next/app";

const TestComponent = () => <div>learn react</div>;

test("renders learn react link", () => {
  const props: AppProps = {
    Component: TestComponent,
    pageProps: {},
    router: {} as any, // Add a mock router object
  };

  render(<App {...props} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
