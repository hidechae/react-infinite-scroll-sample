"use client";
import { useApiInfinite } from "@/components/hooks/api";
import { ItemCard } from "@/components/models/item/ItemCard";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Page() {
  const {data, hasNext, fetchMore, isValidating} = useApiInfinite(10);

  const {ref, inView} = useInView();

  // レンダリング後に処理を呼ぶためにuseEffectを使う
  // レンダリング中に呼ばれるとWarningが出るため
  useEffect(() => {
    if (inView && hasNext && !isValidating) {
      fetchMore();
    }
  });

  return (
    <div>
      {data.map((item) =>
        <ItemCard key={item.id} item={item}/>
      )}

      {hasNext && !isValidating && <div ref={ref}/>}
      {isValidating && <div>Loading...</div>}
    </div>
  );
}