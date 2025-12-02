import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import DataEntryPage from "./DataEntryPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <>
      {loggedIn ? (
        <DataEntryPage />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
