"use client";
import { useApiInfinite } from "@/components/hooks/api";
import { ItemCard } from "@/components/models/item/ItemCard";
import { LoadButton } from "@/components/ui/button/LoadButton";
import React from "react";

export default function Page() {
  const {data, hasNext, fetchMore, isValidating} = useApiInfinite(10);

  return (
    <div>
      {data.map((item) =>
        <ItemCard key={item.id} item={item}/>
      )}

      {hasNext && !isValidating &&
        <LoadButton onClick={() => fetchMore()}/>
      }
      {isValidating && <div>Loading...</div>}
    </div>
  );
}