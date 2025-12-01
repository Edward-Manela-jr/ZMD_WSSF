import React, { useState } from "react";

export default function DataEntryPage() {
  // List of all instruments
  const instrumentList = [
    "barometer",
    "standardRaingauge",
    "windVane",
    "cupCounterAnemometer",
    "sunshineRecorder",
    "evaporationPan",
    "thermometerMax",
    "thermometerMin",
    "thermometerWetBulb",
    "thermometerDryBulb",
    "automaticRaingauge",
    "groundMinimumThermometer",
    "soilThermometer",
    "earthThermometer",
  ];

  // Initialize instrument state based on the list
  const initialInstrumentState = instrumentList.reduce((acc, inst) => {
    acc[inst] = { available: false, status: "" };
    return acc;
  }, {});

  // Full formData state
  const [formData, setFormData] = useState({
    stationNameNumber: "",
    lastDateVisited: "",
    provinceeName: "",
    userName: "",
    stationImage: null,
    manPerStation: "",
    instruments: initialInstrumentState,
    functionalInstruments: "",
    nonFunctionalInstruments: "",
    availableForms: {
      moz401: false,
      moz302: false,
      moz304a: false,
      moz307a: false,
      moz307b: false,
      moz300: false,
    },
    stevensonScreenImages: null,
    synopsMetars: "",
    notes: "",
  });

  // Handle normal field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files : value,
    });
  };

  // Handle checkbox for "instrument available"
  const handleInstrumentChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      instruments: {
        ...formData.instruments,
        [name]: {
          ...formData.instruments[name],
          available: checked,
          // If unchecked, clear status
          status: checked ? formData.instruments[name].status : "",
        },
      },
    });
  };

  // Handle typing in instrument status field
  const handleInstrumentStatus = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      instruments: {
        ...formData.instruments,
        [name]: {
          ...formData.instruments[name],
          status: value,
        },
      },
    });
  };

  // Handle checkbox changes for available forms
  const handleFormsChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      availableForms: {
        ...formData.availableForms,
        [name]: checked,
      },
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

        {/* Man per Station input */}
        <label style={styles.label}>Man per Station *</label>
        <input
          name="manPerStation"
          placeholder="Enter number of personnel at station"
          type="number"
          value={formData.manPerStation}
          onChange={handleChange}
          style={styles.input}
          required
        />

        {/* Instrument Checklist */}
        <label style={styles.label}>Instrument Checklist — Tick if available *</label>
        <div style={styles.checklistContainer}>
          {instrumentList.map((inst) => (
            <div key={inst} style={styles.instrumentRow}>
              <div style={styles.checkboxItem}>
                <input
                  type="checkbox"
                  name={inst}
                  checked={formData.instruments[inst].available}
                  onChange={handleInstrumentChange}
                />
                <label style={styles.checkboxLabel}>
                  {inst.replace(/([A-Z])/g, " $1")}
                </label>
              </div>

              {/* Show status input only if available */}
              {formData.instruments[inst].available && (
                <input
                  type="text"
                  placeholder="Functional / Non-functional / Notes"
                  name={inst}
                  value={formData.instruments[inst].status}
                  onChange={handleInstrumentStatus}
                  style={styles.statusInput}
                />
              )}
            </div>
          ))}
        </div>

        {/* Functional Instruments input
        <label style={styles.label}>Please Provide instrument number's and names of Fully Functional Instruments at this station with commas in between to separate. *</label>
        <p style={styles.fileInfo}>E.g Q-Parten Barometer 12345, Maximum Thermometer 4321,</p>
        <textarea
          name="functionalInstruments"
          placeholder="Enter fully functional instruments"
          value={formData.functionalInstruments}
          onChange={handleChange}
          style={styles.textarea}
          required
        /> */}

        {/* Non-Functional Instruments input
        <label style={styles.label}>Please Provide the names of Non Functional Instruments at this station with commas in between to separate. *</label>
        <textarea
          name="nonFunctionalInstruments"
          placeholder="Enter non-functional instruments"
          value={formData.nonFunctionalInstruments}
          onChange={handleChange}
          style={styles.textarea}
          required
        /> */}

        {/* Available Forms Checklist */}
        <label style={styles.label}>Please provide Details of Forms Available at your Station Tick if available</label>
        <div style={styles.checklistContainer}>
          <div style={styles.checkboxItem}>
            <input
              type="checkbox"
              name="moz401"
              checked={formData.availableForms.moz401}
              onChange={handleFormsChange}
              id="moz401"
            />
            <label htmlFor="moz401" style={styles.checkboxLabel}>MOZ401</label>
          </div>

          <div style={styles.checkboxItem}>
            <input
              type="checkbox"
              name="moz302"
              checked={formData.availableForms.moz302}
              onChange={handleFormsChange}
              id="moz302"
            />
            <label htmlFor="moz302" style={styles.checkboxLabel}>MOZ302</label>
          </div>

          <div style={styles.checkboxItem}>
            <input
              type="checkbox"
              name="moz304a"
              checked={formData.availableForms.moz304a}
              onChange={handleFormsChange}
              id="moz304a"
            />
            <label htmlFor="moz304a" style={styles.checkboxLabel}>MOZ304A</label>
          </div>

          <div style={styles.checkboxItem}>
            <input
              type="checkbox"
              name="moz307a"
              checked={formData.availableForms.moz307a}
              onChange={handleFormsChange}
              id="moz307a"
            />
            <label htmlFor="moz307a" style={styles.checkboxLabel}>MOZ307A</label>
          </div>

          <div style={styles.checkboxItem}>
            <input
              type="checkbox"
              name="moz307b"
              checked={formData.availableForms.moz307b}
              onChange={handleFormsChange}
              id="moz307b"
            />
            <label htmlFor="moz307b" style={styles.checkboxLabel}>MOZ307B</label>
          </div>

          <div style={styles.checkboxItem}>
            <input
              type="checkbox"
              name="moz300"
              checked={formData.availableForms.moz300}
              onChange={handleFormsChange}
              id="moz300"
            />
            <label htmlFor="moz300" style={styles.checkboxLabel}>MOZ300</label>
          </div>
        </div>

        {/* Stevenson Screen Images upload */}
        <label style={styles.label}>Picture of the Stevenson Screen Outside and Inside *</label>
        <p style={styles.fileInfo}>Upload up to 5 supported files: image. Max 10 MB per file.</p>
        <input
          type="file"
          name="stevensonScreenImages"
          accept="image/*"
          onChange={handleChange}
          style={styles.input}
          multiple
          required
        />

        {/* SYNOPS and METARS selection */}
        <label style={styles.label}>Do you collect SYNOPS and METARS or both? *</label>
        <div style={styles.radioContainer}>
          <div style={styles.radioItem}>
            <input
              type="radio"
              name="synopsMetars"
              value="synopsOnly"
              checked={formData.synopsMetars === "synopsOnly"}
              onChange={handleChange}
              id="synopsOnly"
              required
            />
            <label htmlFor="synopsOnly" style={styles.radioLabel}>SYNOPS Only</label>
          </div>

          <div style={styles.radioItem}>
            <input
              type="radio"
              name="synopsMetars"
              value="synopsAndMetars"
              checked={formData.synopsMetars === "synopsAndMetars"}
              onChange={handleChange}
              id="synopsAndMetars"
              required
            />
            <label htmlFor="synopsAndMetars" style={styles.radioLabel}>SYNOPS and METARS</label>
          </div>
        </div>

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
  checklistContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  instrumentRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  checkboxItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "50%",
  },
  checkboxLabel: {
    fontWeight: "normal",
    margin: "0",
    textTransform: "capitalize",
  },
  statusInput: {
    padding: "5px",
    flex: 1,
    fontSize: "0.9rem",
  },
  radioContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  radioItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  radioLabel: {
    fontWeight: "normal",
    margin: "0",
  },
  textarea: {
    padding: "10px",
    fontSize: "1rem",
    height: "80px",
    fontFamily: "Arial",
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
