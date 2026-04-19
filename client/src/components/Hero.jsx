import React from "react";
import nature from '../assets/nature2.jpeg';

const Hero = () => {
  return (
    <header
      style={styles.hero}
      role="banner"
      aria-label="Hero section with mission call-to-action"
    >
      <div style={styles.overlay} />
      <div style={styles.heroContent}>
        <h1 style={styles.title}>Plant Green, Change Lives</h1>
        <p style={styles.subtitle}>
          Join our mission to restore ecosystems, support local communities, and
          build a climate-resilient future.
        </p>
        <div style={styles.actions}>
          <a href="#donate" style={styles.primaryBtn}>Donate now</a>
          <a href="#programs" style={styles.secondaryBtn}>Explore programs</a>
        </div>
      </div>
    </header>
  );
};

const styles = {
  hero: {
    position: "relative",
    minHeight: "80vh",
    backgroundImage: `linear-gradient(rgba(0,60,30,0.35), rgba(0,60,30,0.35)), url(${nature})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "0 1rem",
  },
  overlay: { display: "none" },
  heroContent: { maxWidth: 840 },
  title: { fontSize: "clamp(2rem, 5vw, 3.25rem)", margin: "0 0 0.5rem" },
  subtitle: { fontSize: "clamp(1rem, 2.5vw, 1.25rem)", marginBottom: "1.25rem" },
  actions: { display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" },
  primaryBtn: {
    background: "#2e8b57",
    color: "#fff",
    padding: "0.75rem 1.25rem",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
  },
  secondaryBtn: {
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    padding: "0.75rem 1.25rem",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.5)",
    backdropFilter: "blur(2px)",
  },
};

export default Hero;