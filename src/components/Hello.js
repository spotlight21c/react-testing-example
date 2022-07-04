import useHello from "../hooks/useHello";

export default function Hello() {
  const { hello } = useHello();

  const helloMessage = hello();

  return <p data-testid="hello">{helloMessage}</p>;
}
