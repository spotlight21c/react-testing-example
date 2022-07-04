import { render, screen } from "@testing-library/react";
import Hello from "./Hello";

jest.mock("../hooks/useHello", () => ({
  __esModule: true,
  default: () => ({
    hello: () => "hello",
  }),
}));

test("renders hello message", () => {
  render(<Hello />);
  const helloElement = screen.getByTestId("hello");
  expect(helloElement).toHaveTextContent("hello");
});
