import React, { useState } from "react";
import { logCompany } from "../axiosUtil/api";

export default function LoginCompany(props) {
  const [formData, setFormData] = useState({
    companyName: "",
    companyId: "",
    serialId: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.companyId && formData.companyId === 0) {
      alert("Invalid company Id");
      return;
    }
    try {
      const res = await logCompany(formData);
      if (res) {
        props.updateCompany(formData.companyId);
        setFormData({
          companyName: "",
          companyId: "",
          serialId: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-container" style={{ padding: "2rem" }}>
      <div className="user-container">
        <h2>Login Company</h2>
        <form>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <input
            type="email"
            name="companyId"
            placeholder="Company Id"
            value={formData.companyId}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <input
            type="text"
            name="serialId"
            placeholder="Serial Id"
            value={formData.serialId}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <button type="submit" onClick={handleSubmit}>
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
