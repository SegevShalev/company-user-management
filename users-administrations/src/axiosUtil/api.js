import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createUser = async (userData, companyId) => {
  try {
    return await api.post(`/user/register/company/${companyId}`, userData);
  } catch (err) {
    const errResp = err?.response;
    switch (errResp) {
      case "duplicate email":
        alert("User already exist");
        break;
      case "input error":
        alert("Input error");
        break;
      default:
        alert("Could not create user");
    }

    return false;
  }
};

export const deleteUserByEmail = async (email) => {
  try {
    return await api.delete(`/user/email/${email}`);
  } catch (err) {
    alert("Could not delete user");
    throw err;
  }
};

export const deleteUserById = async (id) => {
  try {
    const res = await api.delete(`/user/id/${id}`);
    return res;
  } catch (err) {
    alert("Could not delete user");
    throw err;
  }
};

export const getAllUsers = async (page, companyId) => {
  try {
    const res = await api.get(`/user/page/${page}/company/${companyId}`);
    return res.data;
  } catch (err) {
    alert("Could not fetch users");
  }
};

export const logCompany = async (formdata) => {
  try {
    return await api.post(`/company/loging`, formdata);
  } catch (err) {
    const errResp = err?.response;
    switch (errResp) {
      case "duplicate company":
        alert("Company already exist");
        break;
      case "input error":
        alert("Input error");
        break;
      default:
        alert("Could not create Company");
    }
    return false;
  }
};

export default api;
