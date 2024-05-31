"use client";

import useSWR from "swr";
import { Item } from "@/models/Item";
import useSWRInfinite from "swr/infinite";
import { useCallback } from "react";

const host = "http://localhost:3000";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Response = {
  items: Item[],
  hasNext: boolean,
}

export function useApi(params: { offset: number, limit: number } = {offset: 0, limit: 10}): {
  data: Item[],
  hasNext: boolean,
  error: any,
  isLoading: boolean,
} {
  const {
    data,
    error,
    isLoading
  } = useSWR<Response>(`${host}/api?offset=${params.offset}&limit=${params.limit}`, fetcher);

  return {
    data:    data?.items || [],
    error,
    isLoading,
    hasNext: data?.hasNext || false,
  };
}

export function useApiInfinite(limit: number = 10): {
  data: Item[],
  hasNext: boolean,
  fetchMore: () => void,
  isLoading: boolean,
  isValidating: boolean,
} {
  const getKey = useCallback((pageIndex: number, previousPageData: Response) => {
    // 最後に到達した
    if (previousPageData && previousPageData.items.length == 0) return null;

    return `/api?offset=${pageIndex * limit}&limit=${limit}`;
  }, [limit]);

  const {data, size, setSize, isLoading, isValidating} = useSWRInfinite<Response>(getKey, fetcher);

  return {
    data:      data ? data.flatMap((d) => d.items) : [],
    hasNext:   data ? data[data.length - 1].hasNext : false,
    fetchMore: () => setSize(size + 1),
    isLoading,
    isValidating,
  };
}