"use client"
import React, { useState, useMemo, useRef } from "react";
import { Button, Row, Col, Modal } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";

const defaultPerson = { name: "", traits: [] };

export default function App() {
  const [people, setPeople] = useState([
    { ...defaultPerson },
    { ...defaultPerson },
    { ...defaultPerson },
    { ...defaultPerson },
    { ...defaultPerson }
  ]);
  const [idealTraits, setIdealTraits] = useState([]);
  const [generatedTraits, setGeneratedTraits] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [sharedUrl, setSharedUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const resultRef = useRef(null);

  const handlePersonChange = (index, key, value) => {
    const updated = [...people];
    updated[index][key] = value;
    setPeople(updated);
  };

  const generateTraits = () => {
    const allTraits = people.flatMap((p) => p.traits.map((t) => t.label));
    const shuffled = allTraits.sort(() => 0.5 - Math.random());
    const selected = [...new Set(shuffled)].slice(0, 5);
    setGeneratedTraits(selected);
  };

  const allAvailableTraits = useMemo(() => {
    const traits = people.flatMap((p) => p.traits);
    const unique = Array.from(new Map(traits.map(t => [t.label, t])).values());
    return unique;
  }, [people]);

  const generateSummary = () => {
    if (generatedTraits.length === 0) return "";
    const funTemplates = [
      `You're vibing with traits like ${generatedTraits.slice(0, 3).join(", ")} — not too bad, huh?`,
      `Looks like your inner circle made you ${generatedTraits[0]}, ${generatedTraits[1]} and a little bit ${generatedTraits[2]}.`,
      `Your personality is a delightful cocktail of ${generatedTraits.slice(0, 3).join(", ")}. Cheers to that!`,
      `Mirror mirror on the wall... you're a mix of ${generatedTraits.slice(0, 3).join(", ")} after all.`,
      `Reflecting your circle, you're clearly ${generatedTraits.slice(0, 3).join(", ")}. Shine on!`
    ];
    const random = Math.floor(Math.random() * funTemplates.length);
    return funTemplates[random];
  };

  const exportImage = async () => {
    if (!resultRef.current) return;
    const selectPortals = document.querySelectorAll(".react-select__menu");
    selectPortals.forEach(p => p.setAttribute("style", "display:none"));

    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#ffffff",
        useCORS: true,
        scale: 2
      });
      const dataUrl = canvas.toDataURL("image/png");
      setPreviewUrl(dataUrl);
      setShowModal(true);

      const blob = await (await fetch(dataUrl)).blob();
      const formData = new FormData();
      formData.append("image", blob, "mirror.png");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setSharedUrl(data.url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("An error occurred while generating the image.");
    } finally {
      selectPortals.forEach(p => p.setAttribute("style", "display:block"));
    }
  };

  const [showIntro, setShowIntro] = useState(true);

  return showIntro ? (
    <div className="container py-5 text-center">
      <h1 className="mb-4">🧬 Discover Your Mirror</h1>
      <p className="lead">You are the average of the 5 people you spend the most time with.<br/>Let's find out who you are, and who you want to become.</p>
      <div className="my-4">
        <img
          src="/intro-illustration.png"
          alt="You are the average of the 5 people around you"
          style={{ maxWidth: '100%', cursor: 'pointer' }}
          onClick={() => setShowIntro(false)}
        />
      </div>
    </div>
  ) : (
    <div className="container py-4">
    {people.map((person, index) => (
      <div className="mb-4 p-3 border rounded" key={index}>
        <Row>
          <Col md={4} className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={person.name}
              onChange={(e) => handlePersonChange(index, "name", e.target.value)}
            />
          </Col>
          <Col md={8}>
            <CreatableSelect
              classNamePrefix="react-select"
              isMulti
              value={person.traits}
              onChange={(selected) => handlePersonChange(index, "traits", selected)}
              placeholder="Select or create personality traits"
            />
          </Col>
        </Row>
      </div>
    ))}

    <div className="mb-4 p-3 border rounded">
      <h5>🌟 Traits You Aspire To</h5>
      <CreatableSelect
        classNamePrefix="react-select"
        isMulti
        options={allAvailableTraits}
        value={idealTraits}
        onChange={(selected) => setIdealTraits(selected)}
        placeholder="Select or create traits you want to embody"
      />
    </div>
    <div className="container py-4">
      <Button variant="primary" onClick={generateTraits}>
        Generate My Personality Profile
      </Button>

      <div ref={resultRef} className="mt-5">
        <h4 className="text-center mb-4">🧠 Personality Snapshot</h4>
        <Row>
          {generatedTraits.length > 0 && (
            <Col md={6} className="mb-4">
              <div className="p-3 border rounded h-100">
                <h5 className="text-center">🤝 Based on Your Circle</h5>
                <ul className="mb-0">
                  {generatedTraits.map((trait, i) => (
                    <li key={i}>{trait}</li>
                  ))}
                </ul>
              </div>
            </Col>
          )}
          {idealTraits.length > 0 && (
            <Col md={6} className="mb-4">
              <div className="p-3 border rounded h-100">
                <h5 className="text-center">🚀 The Person You Want to Be</h5>
                <ul className="mb-0">
                  {idealTraits.map((trait, i) => (
                    <li key={i}>{trait.label}</li>
                  ))}
                </ul>
              </div>
            </Col>
          )}
        </Row>
        {generatedTraits.length > 0 && (
          <p className="mt-4 text-center fst-italic px-3" style={{ maxWidth: '700px', margin: '0 auto' }}>{generateSummary()}</p>
        )}
        </div>
      </div>

      <Button className="mt-3 me-2" variant="secondary" onClick={exportImage}>
        Preview and Upload Image
      </Button>

      {sharedUrl && (
        <Button className="mt-4 d-block mx-auto"
          variant="outline-primary"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "My Personality Mirror",
                text: "Check out who I am based on the 5 people closest to me!",
                url: window.location.origin + sharedUrl
              }).catch(console.error);
            } else {
              alert("Sharing is not supported on this device.");
            }
          }}
        >
          📲 Share with friends
        </Button>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Preview Result</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {previewUrl && <img src={previewUrl} alt="Result Preview" className="img-fluid" />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            const link = document.createElement("a");
            link.download = "personality-result.png";
            link.href = previewUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}>
            Download Image
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
