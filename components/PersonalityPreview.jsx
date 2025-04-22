// components/PersonalityPreview.jsx
"use client";
import React, { forwardRef } from "react";

const PersonalityPreview = forwardRef(({ traits, idealTraits, summary }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: 1080,
        height: 1920,
        padding: 80,
        background: "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#333",
        textAlign: "center",
        boxSizing: "border-box"
      }}
    >
      <h1 style={{ fontSize: 64, marginBottom: 20 }}>🪞 Personality Mirror</h1>
      <img
        src="/illustration-body.png"
        alt="Body Illustration"
        style={{ width: "50%", maxWidth: 400, marginBottom: 40 }}
      />

      <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
        <div>
          <h3>🤝 You Reflect</h3>
          <ul style={{ listStyle: "none", padding: 0, fontSize: 36 }}>
            {traits.map((trait, i) => (
              <li key={i}>{trait}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>🚀 You Aspire To</h3>
          <ul style={{ listStyle: "none", padding: 0, fontSize: 36 }}>
            {idealTraits.map((trait, i) => (
              <li key={i}>{trait.label}</li>
            ))}
          </ul>
        </div>
      </div>

      <p style={{ fontSize: 32, fontStyle: "italic", maxWidth: "80%" }}>{summary}</p>
    </div>
  );
});

export default PersonalityPreview;
