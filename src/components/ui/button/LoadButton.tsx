export function LoadButton({onClick}: { onClick: () => void }) {
  return (
    <button
      style={{
        height:   "150px",
        width:    "100%",
        border:   "1px solid #ddd",
        fontSize: "3rem"
      }}
      onClick={onClick}>
      Load More
    </button>
  );
}