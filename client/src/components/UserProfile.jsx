import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../actions/programs';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id || user?.newUser?._id;
  const dispatch = useDispatch();

  // Get user data from Redux store
  const reduxUserData = useSelector((state) => state.users);

  const [userData, setUserData] = useState(null);
  const [userPhotos, setUserPhotos] = useState([]);

  // Fetch photos filtered by the user's email
  useEffect(() => {
    const fetchPhotos = async () => {
      if (userData?.email) {
        try {
          const response = await fetch(`http://localhost:5005/admin/getPhoto?userEmail=${encodeURIComponent(userData.email)}`);
          if (response.ok) {
            const photos = await response.json();
            setUserPhotos(photos);
          } else {
            console.error("Failed to fetch photos");
          }
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      }
    };

    fetchPhotos();
  }, [userData?.email]);

  // Dispatch action to fetch user details
  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId]);

  // Update local state when Redux user data changes
  useEffect(() => {
    if (reduxUserData) {
      setUserData(reduxUserData);
    }
  }, [reduxUserData]);

  const totalImages = userPhotos.length;
  const totalCarbonSequestered = totalImages*3.67;

  return (
    <div style={styles.container}>

      {/* User Info Header */}
      <header style={styles.header}>
        <h1 style={styles.userName}>Welcome {userData?.username || "Loading..."}</h1>
        <p style={styles.userEmail}>Your Email: {userData?.email || ""}</p>
      </header>

      {/* Content */}
      <div style={styles.content}>

        {/* Left Panel - Total Carbon Sequestered */}
        <aside style={styles.leftPanel}>
          <h2>Total Carbon Sequestered</h2>
          <div style={styles.carbonValue}>
            {totalCarbonSequestered} kg CO<sub>2</sub>
          </div>
        </aside>

        {/* Right Panel - Programs Donated */}
        <section style={styles.programsPanel}>
          <h2>Programs Donated To</h2>
          {(userData?.donatedPrograms?.length || 0) === 0 ? (
            <p>No donation programs found.</p>
          ) : (
            <ul style={styles.programList}>
              {userData.donatedPrograms.map((program) => (
                <li key={program._id} style={styles.programItem}>
                  {program.title}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      {/* User Photos Section */}
      <section style={{ marginTop: "40px" }}>
        <h2 style={styles.userName}>User Photos</h2>
        {userPhotos.length === 0 ? (
          <p>No photos uploaded yet.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {userPhotos.map((photo) => (
              <div key={photo._id} style={{ textAlign: 'left', width: '180px', backgroundColor: '#f0f7f3', padding: '10px', borderRadius: '12px', border: '1px solid #c1dcc0' }}>
                <img
                  src={`http://localhost:5005/admin/getPhoto/${photo.imageId}`}
                  alt={photo.description || 'User photo'}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '8px' }}
                />
                {photo.treeSpecies && (
                  <p style={{ margin: '4px 0', fontSize: '0.85rem', color: '#154734', fontWeight: 'bold' }}>
                    🌿 {photo.treeSpecies}
                  </p>
                )}
                {photo.location && photo.location.coordinates && (
                  <p style={{ margin: '4px 0', fontSize: '0.8rem' }}>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${photo.location.coordinates[1]},${photo.location.coordinates[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#4a6c4a', textDecoration: 'none', borderBottom: '1px dashed #4a6c4a' }}
                      title="View on Google Maps"
                    >
                      📍 View on Map
                    </a>
                  </p>
                )}
                <p style={{ marginTop: '6px', fontSize: '0.85rem', color: '#444' }}>
                  {photo.description || 'No description'}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      


    </div>
  );
};

const styles = {
  container: {
    maxWidth: 900,
    margin: "2rem auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    borderBottom: "2px solid #ccc",
    paddingBottom: "1rem",
    marginBottom: "2rem",
  },
  userName: {
    fontSize: "2rem",
    margin: 0,
    color: "#154734",
  },
  userEmail: {
    fontSize: "1.1rem",
    margin: 0,
    color: "#4a6c4a",
  },
  content: {
    display: "flex",
    gap: "2rem",
  },
  leftPanel: {
    flex: "0 0 250px",
    border: "1px solid #c1dcc0",
    borderRadius: 12,
    padding: "1.5rem",
    backgroundColor: "#e7f1e7",
    textAlign: "center",
    color: "#2e4d25",
  },
  carbonValue: {
    marginTop: "1rem",
    fontSize: "2.2rem",
    fontWeight: "bold",
  },
  programsPanel: {
    flex: 1,
    border: "1px solid #c1dcc0",
    borderRadius: 12,
    padding: "1.5rem",
    backgroundColor: "#f7fbf8",
    color: "#386641",
  },
  programList: {
    listStyle: "none",
    paddingLeft: 0,
    marginTop: "1rem",
  },
  programItem: {
    padding: "0.5rem 0",
    borderBottom: "1px solid #d3e4d3",
  },
};

export default UserProfile;
