export const CustomInput = ({ type, value, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
      }}
    >
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{ padding: "8px" }}
        disabled={type === "disabled"}
      />
    </div>
  );
};
