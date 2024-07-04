export const CustomButton = ({ text, onClick, type = "primary" }) => {
  let color = "#E9573F";
  if (type === "secondary") {
    color = "#606060";
  } else if (type === "danger") {
    color = "#D14E39";
  }

  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px",
        fontSize: "16px",
        backgroundColor: color,
        color: "white",
        fontWeight: "bold",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        height: "32px",
      }}
    >
      {text}
    </button>
  );
};
