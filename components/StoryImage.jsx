// components/StoryImage.jsx
import React from "react";

export default function StoryImage({ traits, idealTraits, summary, people }) {
  return (
    <div style={{
      width: "1080px",
      height: "1920px",
      background: "linear-gradient(to bottom right, #ffe3d3, #ffd6e0)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "40px 60px",
      color: "#333",
      fontFamily: "Times new roman",
      textAlign: "center",
      boxSizing: "border-box"
    }}>

      {/* Header image */}
      <div style={{ width: "100%", height: "25%", marginBottom: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img
          src="https://xjiskfxkdmfq7b3d.public.blob.vercel-storage.com/assets/storybg"
          alt="Header"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "64px", fontWeight: "bold", margin: 0 }}>Your Personality</h1>
        <p style={{ fontSize: "30px", fontStyle: "italic", maxWidth: "800px", marginTop: "20px" }}>{summary}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", backgroundColor: "#ffffffcc", padding: "30px", borderRadius: "24px", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "36px", marginBottom: "16px" }}>🤝 Based on Your Circle</h2>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "28px", textAlign: "left", width: "100%" }}>
          {traits.map((trait, i) => (
            <li key={i}>• {trait}</li>
          ))}
        </ul>
      </div>

      {idealTraits.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", backgroundColor: "#ffffffcc", padding: "30px", borderRadius: "24px", marginBottom: "30px" }}>
          <h2 style={{ fontSize: "36px", marginBottom: "16px" }}>🚀 The Person You Want to Be</h2>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "28px", textAlign: "left", width: "100%" }}>
            {idealTraits.map((trait, i) => (
              <li key={i}>• {trait.label}</li>
            ))}
          </ul>
        </div>
      )}

      {people && people.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", backgroundColor: "#ffffffcc", padding: "30px", borderRadius: "24px", marginBottom: "30px" }}>
          <h2 style={{ fontSize: "36px", marginBottom: "16px" }}>👥 Can Your friends Guess Who's Who?</h2>
          <p style={{ fontSize: "24px", marginBottom: "12px" }}>{people.map((person) => <>{person.name} &nbsp;</>)}</p>
          <p style={{ fontSize: "24px", marginBottom: "12px" }}>They all brought something special. Can your friends match the traits to the right person?</p>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "26px", textAlign: "left", width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
            {people.map((person, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  fontSize: "26px",
                  lineHeight: 1.4
                }}
              >
              
                {person.traits.map((t, j) => (
                  <span
                    key={j}
                    style={{
                      padding: "4px 10px",
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      fontSize: "24px"
                    }}
                  >
                    {t.label}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p style={{ fontSize: "22px" }}>Generated on personality-mirror.vercel.app</p>
      </div>
    </div>
  );
}