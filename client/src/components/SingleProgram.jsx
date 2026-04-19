import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleProgram } from '../actions/programs';
import { useDispatch, useSelector } from "react-redux";

const SingleProgram = () => {
  const { id } = useParams(); // get the program id from URL
  const singleProgram = useSelector((state) => state.programs.program);
  const dispatch = useDispatch();
  const navigate= useNavigate();

  useEffect(() => {
    dispatch(fetchSingleProgram(id));
  }, [dispatch, id]);

  if (!singleProgram) return <p style={styles.notFound}>Program not found</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.leaf}>🍃</span>
        <h1 style={styles.title}>{singleProgram.title}</h1>
      </div>
      <p style={styles.description}>{singleProgram.description}</p>
      {/* Add more fields as needed */}

      <button 
        style={styles.donateButton}
       onClick={() => navigate(`/payment/${singleProgram._id}`)}
      >
        Donate Now
      </button>
    </div>
  );
};

// Earthy color palette and gentle shadows
const styles = {
  container: {
    maxWidth: 800,
    margin: "2rem auto",
    padding: "2rem",
    background: "linear-gradient(135deg,#e7efe6 70%,#c1dcc0 100%)",
    borderRadius: 20,
    border: "1px solid #c2cbb5",
    boxShadow: "0 6px 24px 0 #d8e8dc57",
    fontFamily: "'Quicksand', sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "2.5rem",
    color: "#2e4d25",
    marginLeft: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
  },
  leaf: {
    fontSize: "2.5rem",
    color: "#3f6a36",
  },
  description: {
    fontSize: "1.18rem",
    lineHeight: 1.7,
    color: "#386641",
    marginBottom: "2.5rem",
  },
  donateButton: {
    padding: "0.9rem 2.4rem",
    background: "linear-gradient(90deg, #829260, #6b8c42)",
    color: "#fff",
    border: "none",
    borderRadius: 25,
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: 600,
    boxShadow: "0 4px 16px 0 #bcccab44",
    letterSpacing: "0.06em",
    transition: "background 0.2s, transform 0.2s",
  },
  notFound: {
    textAlign: "center",
    color: "#9d4f18",
    fontSize: "1.3rem",
    marginTop: "3rem",
  },
};

export default SingleProgram;
