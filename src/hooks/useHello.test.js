import { renderHook } from "@testing-library/react-hooks";
import useHello from "./useHello";

test("should use hello hook", () => {
  const { result } = renderHook(() => useHello());

  expect(typeof result.current.hello).toBe("function");
});

test("should return hello message", () => {
  const { result } = renderHook(() => useHello());

  const helloMessage = result.current.hello();

  expect(helloMessage).toBe("hello");
});
