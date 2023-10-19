const User = require("../models/user");

const checkExistence = async (req, res) => {
  const { type, value } = req.query;

  if (!type || !value || (type !== "username" && type !== "email")) {
    return res.status(400).send({ message: "Invalid query parameters." });
  }
  let exists = false;
  try {
    const foundUser = await User.findOne({ [type]: value });
    if (foundUser) {
			console.log(`Duplicate ${type} ${value} found in the database`)
      exists = true;
    }
  } catch (err) {
    return res.status(500).json({ message: "Error querying the database." });
  }

  res.json({ exists });
};

module.exports = { checkExistence };
