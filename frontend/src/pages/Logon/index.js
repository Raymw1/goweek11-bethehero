import React from "react";

import { FiLogIn } from "react-icons/fi";
import "./styles.css";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

export default function Logon() {
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={() => {}}>
          <h1>Login</h1>
          <input type="text" placeholder="Your ID" />
          <button type="submit" className="button">
            Login
          </button>
          <a href="/register">
            <FiLogIn size={16} color="#E02041" />
            Sign Up
          </a>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
