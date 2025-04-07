const companySchema = require("../models/company.model");

loginCompany = async (companyName, companyId, serialId) => {
  if (!companyName || !companyId || !serialId) {
    throw new Error(
      "Something is missing from the new user information you submitted"
    );
  }

  try {
    for (let retries = 0; retries < 3; retries++) {
      let company = await companySchema.findOne({
        companyName,
        companyId,
      });

      if (!company) {
        company = await companySchema.create({
          companyName,
          companyId,
          serialId,
        });
        if (company) return company;
      } else if (serialId === company.serialId) {
        return company;
      } else {
        throw new Error("wrong credentials");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    throw new Error("Could not create company");
  } catch (err) {
    throw err;
  }
};

module.exports = { loginCompany };
