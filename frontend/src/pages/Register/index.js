import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";
import logoImg from "../../assets/logo.svg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const navigation = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const {
        data: { id },
      } = await api.post("/ongs", {
        name,
        email,
        whatsapp,
        city,
        uf,
      });
      navigation("/");
    } catch (error) {
      console.error("Error on registration, try again!", error);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Sign Up</h1>
          <p>
            Sign up, join the platform and help people find incidents of your
            ONG.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Sign In
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="ONG Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
