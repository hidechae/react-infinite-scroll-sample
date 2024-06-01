"use client";
import {VariableSizeGrid} from "react-window"
import {ItemCard} from "@/components/models/item/ItemCard";
import {useApiInfinite} from "@/components/hooks/api";
import {useInView} from "react-intersection-observer";
import React, {useEffect} from "react";

// NG
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
            <VariableSizeGrid
                columnCount={3}
                columnWidth={_ => 300}
                height={1000}
                rowCount={Math.ceil(data.length / 3)}
                rowHeight={_ => 300}
                width={900}
            >
                {({columnIndex, rowIndex, style}) => {
                    const i = rowIndex * 3 + columnIndex
                    return (
                        <div style={style}>
                            {data[i] && <ItemCard item={data[i]}/>}
                        </div>
                    )
                }}
            </VariableSizeGrid>

            {/*Gridの最後に差し込みたいが、Maximum update depth exceeded.となりうまくいかない*/}
            {/*スクロール後は、常に表示されることになるので最後までロードされ続けてしまう*/}
            {hasNext && !isValidating && <div ref={ref}/>}
            {isValidating && <div>Loading...</div>}
        </div>
    )
}
