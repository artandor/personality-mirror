
export default async function SharePage(props) {
  const params = await props.params;
  const { filename } = params;
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#f8f9fa",
      padding: "2rem"
    }}>
      <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>🪞 Your Personality Snapshot</h1>
      <img
        src={`/uploads/${filename}`}
        alt="Shared Personality Result"
        style={{ maxWidth: "100%", borderRadius: "1rem", boxShadow: "0 0 20px rgba(0,0,0,0.1)" }}
      />
    </div>
  );
}
