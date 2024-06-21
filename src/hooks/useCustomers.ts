import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCustomers = (phone: string) => {
  const { data, error } = useSWR(
    phone ? `/api/customers?phone=${encodeURIComponent(phone)}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    customers: data,
    isLoading: !error && !data,
    isError: error,
  };
};
