import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchprograms, addprogram } from "../actions/programs.js";
import { uploadPhoto } from '../actions/uploadPhoto.js';

const AdminProfile = () => {
  const [activeForm, setActiveForm] = useState(null); // 'program' | 'photos'
  const [program, setProgram] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [description, setDescription] = useState('');
  const [treeSpecies, setTreeSpecies] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(true);

  // Use composite index-based keys (programIndex-userIndex) for checkbox state
  const [checkedDonors, setCheckedDonors] = useState(() => {
    const saved = localStorage.getItem('checkedDonors');
    return saved ? JSON.parse(saved) : {};
  });

  const dispatch = useDispatch();
  const programs = useSelector((state) => state.programs);

  // Persist checkedDonors whenever changed
  useEffect(() => {
    localStorage.setItem('checkedDonors', JSON.stringify(checkedDonors));
  }, [checkedDonors]);

  // Fetch programs on mount
  useEffect(() => {
    const fetchAllPrograms = async () => {
      try {
        setLoading(true);
        await dispatch(fetchprograms());
      } catch (err) {
        console.error("Error loading programs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPrograms();
  }, [dispatch]);

  // Program form handlers
  const handleProgramChange = (e) => {
    const { name, value } = e.target;
    setProgram({ ...program, [name]: value });
  };

  const handleProgramSubmit = (e) => {
    e.preventDefault();
    if (!program.title || !program.description) return alert("Fill all fields.");
    dispatch(addprogram(program));
    setProgram({ title: "", description: "" });
    alert("Program added!");
  };


  // Photo form handlers
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    if (!image) return alert("Select an image.");
    if (!userEmail) return alert("Enter user email.");
    const formData = new FormData();
    formData.append('userEmail', userEmail);
    formData.append('description', description);
    formData.append('treeSpecies', treeSpecies);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('photo', image);
    dispatch(uploadPhoto(formData));
    setImage(null);
    setImagePreview("");
    setUserEmail("");
    setDescription('');
    setTreeSpecies('');
    setLatitude('');
    setLongitude('');
  };

  // Checkbox toggle handler using composite key "programIndex-userIndex"
  const handleDonorCheckboxChange = (key) => {
    setCheckedDonors(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem('checkedDonors', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div style={styles.container}>
        <h2 style={styles.title}>Admin Dashboard</h2>

        {/* Toggle buttons */}
        <div style={styles.buttonGroup}>
          <button style={styles.toggleBtn} onClick={() => setActiveForm("program")}>Add Program</button>
          <button style={styles.toggleBtn} onClick={() => setActiveForm("photos")}>Add Photos</button>
        </div>

        {/* Add Program Form */}
        {activeForm === "program" && (
          <form onSubmit={handleProgramSubmit} style={styles.form}>
            <label style={styles.label}>Title</label>
            <input type="text" name="title" value={program.title} onChange={handleProgramChange} style={styles.input} required />
            <label style={styles.label}>Description</label>
            <textarea name="description" value={program.description} onChange={handleProgramChange} style={styles.textarea} required />
            <button type="submit" style={styles.submitBtn}>Upload Program</button>
          </form>
        )}

        {/* Add Photo Form */}
        {activeForm === "photos" && (
          <form onSubmit={handlePhotoSubmit} style={styles.form}>
            <label style={styles.label}>User Email</label>
            <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} style={styles.input} required placeholder="Enter donor email" />
            <label style={styles.label}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...styles.input, height: '80px' }} placeholder="Enter description for the photo" />
            <label style={styles.label}>Tree Species</label>
            <input type="text" value={treeSpecies} onChange={(e) => setTreeSpecies(e.target.value)} style={styles.input} placeholder="e.g. Oak, Maple" />
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label style={styles.label}>Latitude</label>
                <input type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} style={styles.input} placeholder="e.g. 34.0522" required />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label style={styles.label}>Longitude</label>
                <input type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} style={styles.input} placeholder="e.g. -118.2437" required />
              </div>
            </div>
            <label style={styles.label}>Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} style={styles.input} required/>
            {imagePreview && <img src={imagePreview} alt="Preview" style={styles.preview} />}
            <button type="submit" style={styles.submitBtn}>Upload Photo</button>
          </form>
        )}

        {/* Programs & Donors List */}
        <section style={{ marginTop: "40px" }}>
          <h3>Programs and Donors</h3>
          {loading ? (
            <p>Loading programs...</p>
          ) : !Array.isArray(programs) || programs.length === 0 ? (
            <p>No programs found.</p>
          ) : (
            <div>
              {programs.map((program, programIndex) =>
                program ? (
                  <div style={styles.programCard} key={program._id}>
                    <h4>{program.title || "No Title"}</h4>
                    <strong>Donors:</strong>
                    {program.donatedUsers && program.donatedUsers.length > 0 ? (
                      <ul>
                        {program.donatedUsers.map((user, userIndex) => {
                          const compositeKey = `${programIndex}-${userIndex}`;
                          return (
                            <li 
                              // No React `key` assigned here as requested, but can add compositeKey if desired
                              style={{ display: "flex", alignItems: "center", gap: "8px" }}
                            >
                              <input
                                type="checkbox"
                                checked={!!checkedDonors[compositeKey]}
                                onChange={() => handleDonorCheckboxChange(compositeKey)}
                              />
                              <span>{user.username} ({user.email})</span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p>No donors yet.</p>
                    )}
                  </div>
                ) : null
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "60px auto",
    padding: "30px",
    backgroundColor: "#f9fafc",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Inter', sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "30px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  toggleBtn: {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  label: {
    fontWeight: "500",
    fontSize: "15px",
    color: "#444",
  },
  input: {
    padding: "10px 12px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.2s ease",
  },
  textarea: {
    minHeight: "120px",
    resize: "vertical",
    padding: "10px 12px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.2s ease",
  },
  submitBtn: {
    marginTop: "10px",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  preview: {
    marginTop: "10px",
    width: "100%",
    height: "auto",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  programCard: {
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },

};

export default AdminProfile;
