import "./App.css";
import React, { useState, useEffect } from "react";
import UserManager from "./UI/UserManager";
import LoginCompany from "./UI/LoginCompany";
function App() {
  const [companyId, setCompanyId] = useState(0);

  const updateCompany = (companyId) => {
    console.log(companyId);
    if (companyId) setCompanyId(companyId);
  };

  return (
    <div className="App">
      {companyId ? (
        <UserManager companyId={companyId} />
      ) : (
        <LoginCompany updateCompany={updateCompany} />
      )}
    </div>
  );
}

export default App;
//test
