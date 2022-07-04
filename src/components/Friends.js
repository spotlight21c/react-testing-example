import useFriends from "../hooks/useFriends";

export default function Friends() {
  const { data, isLoading, isError } = useFriends();

  if (isLoading) return <div data-testid="loading">Loading...</div>;
  if (isError) return <div data-testid="error">error</div>;
  return (
    <ul data-testid="list">
      {data?.results?.map((friend) => (
        <li key={friend.name}>{friend.name}</li>
      ))}
    </ul>
  );
}
