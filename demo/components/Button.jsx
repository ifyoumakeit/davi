import d from "../../src/d";

export default ({ children, store, active, onClick }) => {
  return (
    <button
      children={`${children} (${active ? "on" : "off"})`}
      onClick={onClick}
      style={{
        backgroundColor: active ? "red" : "black",
        padding: "24px",
        fontSize: "20px",
        color: "#fff",
      }}
    />
  );
};
