import { render, screen, waitFor } from "@testing-library/react";
import Friends from "./Friends";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            name: "pi",
          },
          {
            name: "ka",
          },
          {
            name: "chu",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders loading message", async () => {
  render(<Friends />);

  expect(screen.getByTestId("loading")).toBeInTheDocument();

  await waitFor(() => screen.findByText("pi")); // for closing test safely
});

test("renders friends list", async () => {
  render(<Friends />);

  await waitFor(() => screen.findByTestId("list"));

  expect(screen.getByText("pi")).toBeInTheDocument();
  expect(screen.getByText("ka")).toBeInTheDocument();
  expect(screen.getByText("chu")).toBeInTheDocument();
});

test("renders error", async () => {
  server.use(
    rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Friends />);

  await waitFor(() => screen.findByTestId("error"));

  expect(screen.getByText("error")).toBeInTheDocument();
});
