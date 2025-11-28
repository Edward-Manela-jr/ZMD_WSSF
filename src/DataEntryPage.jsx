import React, { useState } from "react";

export default function DataEntryPage() {
  // State to manage form input values
  const [formData, setFormData] = useState({
    stationNameNumber: "",
    lastDateVisited: "",
    provinceeName: "",
    userName: "",
    stationImage: null,
    notes: "",
  });

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData); 
    alert("Data captured (not sent to DB yet)");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>ZMD Weather Station Status Form</h1>
      <h2 style={styles.heading2}>Please complete the form below to report station status</h2>
      <h3 style={styles.heading3}>* Indicates required question</h3>

      {/* Form with input fields for data collection */}
      <form style={styles.form} onSubmit={handleSubmit}>
        {/* Station Name and Number input */}
        <label style={styles.label}>Station Name and Number *</label>
        <input
          name="stationNameNumber"
          placeholder="Enter station name and number"
          value={formData.stationNameNumber}
          onChange={handleChange}
          style={styles.input}
          required
        />

        {/* Last date visited input */}
        <label style={styles.label}>Last visit to the station</label>
        <input
          type="date"
          name="lastDateVisited"
          value={formData.lastDateVisited}
          onChange={handleChange}
          style={styles.input}
        />

        {/* Province Name input */}
        <label style={styles.label}>Name of Province *</label>
        <input
          name="provinceeName"
          placeholder="Enter province name"
          value={formData.provinceeName}
          onChange={handleChange}
          style={styles.input}
          required
        />

        {/* User Name input */}
        <label style={styles.label}>Please Provide Your Name *</label>
        <input
          name="userName"
          placeholder="Enter your name"
          value={formData.userName}
          onChange={handleChange}
          style={styles.input}
          required
        />

        {/* Station Image upload */}
        <label style={styles.label}>Provide Observatory Picture of the Screen Yard *</label>
        <p style={styles.fileInfo}>Upload 1 supported file: image. Max 10 MB.</p>
        <input
          type="file"
          name="stationImage"
          accept="image/*"
          onChange={handleChange}
          style={styles.input}
          required
        />

        {/* Submit button */}
        <button style={styles.button}>Save</button>
      </form>
    </div>
  );
}

// Inline styles object for component styling
const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial",
    maxWidth: "600px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "50px",
  },
  heading2: {
    fontSize: "1rem",
    color: "black",
    marginBottom: "10px",
  },
  heading3: {
    fontSize: "0.9rem",
    color: "red",
    marginBottom: "40px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontWeight: "bold",
    marginTop: "10px",
  },
  fileInfo: {
    fontSize: "0.85rem",
    color: "gray",
    margin: "5px 0",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
  },
  textarea: {
    padding: "10px",
    fontSize: "1rem",
    height: "80px",
  },
  button: {
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: "20px",
  },
};