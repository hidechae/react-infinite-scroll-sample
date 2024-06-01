"use client";
import {VariableSizeGrid} from "react-window"
import {ItemCard} from "@/components/models/item/ItemCard";

export default function Page() {
    return (
        <div>
            <VariableSizeGrid
                columnCount={3}
                columnWidth={_ => 300}
                height={1000}
                rowCount={1000}
                rowHeight={_ => 300}
                width={900}
            >
                {({columnIndex, rowIndex, style}) => (
                    <div style={style}>
                        <ItemCard item={{id: rowIndex * 3 + columnIndex + 1}}/>
                    </div>
                )
            }
            </VariableSizeGrid>
        </div>
    )
}