import {Item} from "@/models/Item";

export function ItemCard({item}: { item: Item }) {
    return (
        <div
            style={{
                height: "300px",
                lineHeight: "300px",
                width: "300px",
                textAlign: "center",
                border: "1px solid #ddd",
                fontSize: "6rem",
            }}
            key={item.id}>{item.id}</div>
    );
}