import { renderHook } from "@testing-library/react-hooks";
import useFriends from "./useFriends";
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

test("should use friends hook", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useFriends());

  expect(result.current.isLoading).toBe(true);
  expect(result.current.isError).toBe(false);
  expect(typeof result.current.data).toEqual("object");

  await waitForNextUpdate(); // for closing test safely
});

test("should return friends list", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useFriends());

  await waitForNextUpdate();

  expect(result.current.isLoading).toBe(false);
  expect(result.current.isError).toBe(false);
  expect(result.current.data.results.length).toBeGreaterThan(0);
});

test("should return error", async () => {
  server.use(
    rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  const { result, waitForNextUpdate } = renderHook(() => useFriends());

  await waitForNextUpdate();

  expect(result.current.isLoading).toBe(false);
  expect(result.current.isError).toBe(true);
});
