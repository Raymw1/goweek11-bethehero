import React from "react";
import { Link } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";
import logoImg from "../../assets/logo.svg";

export default function Register() {
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
        <form onSubmit={() => {}}>
          <input placeholder="ONG Name" />
          <input type="email" placeholder="E-mail" />
          <input placeholder="Whatsapp" />
          <div className="input-group">
            <input placeholder="City" />
            <input placeholder="UF" style={{ width: 80 }} />
          </div>
          <button className="button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
