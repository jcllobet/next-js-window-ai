// Import necessary modules and components
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { useRouter } from "next/router";

// Mock the useRouter module
jest.mock("next/router", () => require("next-router-mock"));

const ExampleComponent = ({ href = "" }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(href)}>
      The current route is: {router.asPath}
    </button>
  );
};

// Test the next-router-mock package
describe("next-router-mock", () => {
  it("mocks the useRouter hook", () => {
    // Set the initial url:
    mockRouter.push("/initial-path"); //?

    // Render the component:
    render(<ExampleComponent href="/foo?bar=baz" />);
    expect(screen.getByRole("button")).toHaveTextContent(
      "The current route is: /initial-path"
    );

    // Click the button:
    fireEvent.click(screen.getByRole("button"));

    // Ensure the router was updated:
    expect(mockRouter).toMatchObject({
      asPath: "/foo?bar=baz",
      pathname: "/foo",
      query: { bar: "baz" },
    });
  });
});
