export const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
      }}
    >
      <img
        src="/src/assets/logo.png"
        style={{ width: "60px", height: "60px", marginRight: "16px" }}
      />
      <p id="title">Fast Orders</p>
    </div>
  );
};
