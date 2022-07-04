import { useEffect, useState } from "react";

export default function useFriends() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const jsonResult = await response.json();
        setData(jsonResult);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return { data, isLoading, isError };
}
