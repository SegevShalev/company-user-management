const UserSchema = require("../models/user.model");

addNewUser = async (firstName, lastName, password, email, companyId) => {
  if (!firstName || !lastName || !email || !password || !companyId) {
    throw new Error(
      "Something is missing from the new user information you submitted"
    );
  }

  try {
    for (let retries = 0; retries < 3; retries++) {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        companyId,
      };
      const userCreated = await UserSchema.create(newUser);
      if (userCreated) return userCreated;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    throw new Error("Could not create user");
  } catch (err) {
    throw err;
  }
};

deleteUserByEmail = async (email) => {
  try {
    return await UserSchema.deleteOne({ email });
  } catch (err) {
    throw err;
  }
};

deleteUserById = async (id) => {
  try {
    return await UserSchema.deleteOne({ _id: id });
  } catch (err) {
    throw err;
  }
};
getAllUsers = async (page = 0, companyId) => {
  page = Number(page);
  const LIMIT = 10;
  try {
    for (let retries = 0; retries < 3; retries++) {
      const res = await UserSchema.find({ companyId })
        .limit(LIMIT)
        .skip(page * LIMIT);
      if (res) {
        return res;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    throw new Error("Could not get users");
  } catch (err) {
    throw err;
  }
};

module.exports = { addNewUser, deleteUserByEmail, deleteUserById, getAllUsers };
