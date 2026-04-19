import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchprograms } from "../actions/programs";
import { useNavigate } from "react-router-dom";

const Programs = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  // Access programs array from Redux
  const programs = useSelector((state) => state.programs);

  // Fetch programs from backend on mount
  useEffect(() => {
    dispatch(fetchprograms());
  }, [dispatch]);



  const onLearnMore = (id) => {
    navigate(`/program/${id}`);
  };
  return (
    <section id="programs" style={styles.wrap} aria-labelledby="programs-title">
      <div style={styles.container}>
        <h2 id="programs-title" style={styles.h2}>
          Programs
        </h2>
        <div style={styles.grid}>
          {Array.isArray(programs) && programs.length > 0 ? (
            programs.map((card) =>
              card && card._id ? (
                <article key={card._id} style={styles.card}>
                  <h3 style={styles.h3}>{card.title || "No Title"}</h3>
                  <p style={styles.p}>
                    {card.description || "No Description Provided"}
                  </p>
                  <button
                    style={styles.link}
                    aria-label={`Learn more about ${card.title}`}
                    onClick={() => onLearnMore(card._id)}
                  >
                    Learn more →
                  </button>

                </article>
              ) : null
            )
          ) : (
            <p>No programs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

const styles = {
  wrap: { padding: "3rem 1rem", background: "#fff" },
  container: { maxWidth: 1080, margin: "0 auto" },
  h2: { color: "#154734", marginBottom: "1rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1rem",
  },
  card: {
    position: "relative", // for delete button positioning
    background: "#f0f7f3",
    border: "1px solid #e0efe6",
    borderRadius: 12,
    padding: "1rem",
  },
  h3: { margin: "0 0 0.25rem", color: "#1f5f47" },
  p: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    whiteSpace: "normal",
  },
  link: { color: "#2e8b57", textDecoration: "none", fontWeight: 600 },

};

export default Programs;
