import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFetch = (api: string | null) => {
  const { data, error } = useSWR(api ? api : null, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
