import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import api from "../../services/api";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";
import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const ongId = localStorage.getItem("ongId");
  const navigate = useNavigate();

  async function handleNewIncident(e) {
    e.preventDefault();
    try {
      await api.post(
        "/incidents",
        { title, description, value },
        { headers: { Authorization: ongId } }
      );
      navigate("/profile");
    } catch (err) {
      alert("Error on register incident, try again!");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>New Incident</h1>
          <p>Describe the incident to find a hero to figure that out!</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Back home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Incident title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Value (R$)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="button" type="submit">
            New incident
          </button>
        </form>
      </div>
    </div>
  );
}
